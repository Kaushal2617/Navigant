'use client';

import React, { useRef, useEffect, useCallback, useMemo } from 'react';

import { gsap } from 'gsap';

// InertiaPlugin is a premium GSAP plugin
// If you don't have access to it, animations will fallback to standard GSAP
let hasInertiaPlugin = false;
try {
  // @ts-ignore - InertiaPlugin may not be available
  const { InertiaPlugin } = require('gsap/InertiaPlugin');
  if (InertiaPlugin) {
    gsap.registerPlugin(InertiaPlugin);
    hasInertiaPlugin = true;
  }
} catch (e) {
  // Plugin not available - will use fallback animations
  hasInertiaPlugin = false;
}

const throttle = (func: (...args: any[]) => void, limit: number) => {
  let lastCall = 0;
  return function (this: any, ...args: any[]) {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

interface Dot {
  cx: number;
  cy: number;
  xOffset: number;
  yOffset: number;
  _inertiaApplied: boolean;
}

export interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  maxSpeed?: number;
  resistance?: number;
  returnDuration?: number;
  className?: string;
  style?: React.CSSProperties;
}

function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16)
  };
}

const DotGrid: React.FC<DotGridProps> = ({
  dotSize = 16,
  gap = 32,
  baseColor = '#5227FF',
  activeColor = '#5227FF',
  proximity = 150,
  speedTrigger = 100,
  shockRadius = 250,
  shockStrength = 5,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.5,
  className = '',
  style
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0
  });
  
  // Store props in refs to avoid ResizeObserver reconnection issues
  const propsRef = useRef({ dotSize, gap });
  useEffect(() => {
    propsRef.current = { dotSize, gap };
  }, [dotSize, gap]);

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const circlePath = useMemo(() => {
    if (typeof window === 'undefined' || !window.Path2D) return null;
    const p = new Path2D();
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return p;
  }, [dotSize]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    // Use ref values to avoid dependency issues
    const { dotSize: currentDotSize, gap: currentGap } = propsRef.current;

    const rect = wrap.getBoundingClientRect();
    let width = rect.width;
    let height = rect.height;

    // Better dimension detection with multiple retry attempts
    if (width === 0 || height === 0) {
      // Try to get dimensions from computed styles as fallback
      const computedStyle = window.getComputedStyle(wrap);
      const computedWidth = parseFloat(computedStyle.width);
      const computedHeight = parseFloat(computedStyle.height);
      
      if (computedWidth > 0 && computedHeight > 0) {
        width = computedWidth;
        height = computedHeight;
      } else {
        // If still no dimensions, schedule a retry and return early
        // The retry will be handled by ResizeObserver or the next render
        setTimeout(() => {
          const newRect = wrap.getBoundingClientRect();
          if (newRect.width > 0 && newRect.height > 0) {
            buildGrid(); // Recursively call to rebuild with correct dimensions
          }
        }, 100);
        return; // Exit early, will retry on next attempt
      }
    }

    // Responsive adjustments for smaller screens
    const isSmallScreen = width < 768;
    
    // Adjust gap and dotSize for better performance on smaller screens
    const adjustedGap = isSmallScreen ? Math.max(currentGap * 1.5, currentGap) : currentGap;
    const adjustedDotSize = isSmallScreen ? Math.max(currentDotSize * 0.9, currentDotSize * 0.8) : currentDotSize;

    // Limit canvas size for very small screens to prevent performance issues
    const maxCanvasSize = 4096; // Maximum canvas dimension
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap DPR at 2 for performance
    
    // Calculate actual canvas dimensions
    const canvasWidth = Math.min(width, maxCanvasSize);
    const canvasHeight = Math.min(height, maxCanvasSize);
    
    // Set canvas dimensions properly
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    // Scale context properly
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Calculate grid with adjusted values
    const cols = Math.max(1, Math.floor((canvasWidth + adjustedGap) / (adjustedDotSize + adjustedGap)));
    const rows = Math.max(1, Math.floor((canvasHeight + adjustedGap) / (adjustedDotSize + adjustedGap)));
    const cell = adjustedDotSize + adjustedGap;
    const gridW = cell * cols - adjustedGap;
    const gridH = cell * rows - adjustedGap;
    const extraX = canvasWidth - gridW;
    const extraY = canvasHeight - gridH;
    const startX = extraX / 2 + adjustedDotSize / 2;
    const startY = extraY / 2 + adjustedDotSize / 2;

    const dots: Dot[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;
        // Only add dots that are within canvas bounds
        if (cx >= 0 && cx <= canvasWidth && cy >= 0 && cy <= canvasHeight) {
          dots.push({ cx, cy, xOffset: 0, yOffset: 0, _inertiaApplied: false });
        }
      }
    }

    dotsRef.current = dots;
  }, []); // Empty deps - uses refs instead

  useEffect(() => {
    if (!circlePath) return;
    let rafId: number;
    let isDrawing = true;
    const proxSq = proximity * proximity;

    const draw = () => {
      if (!isDrawing) return;
      
      const canvas = canvasRef.current;
      if (!canvas || canvas.width === 0 || canvas.height === 0) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      const ctx = canvas.getContext('2d', { alpha: true });
      if (!ctx) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      // Clear canvas - context is already scaled, so use logical dimensions
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const logicalWidth = canvas.width / dpr;
      const logicalHeight = canvas.height / dpr;
      ctx.clearRect(0, 0, logicalWidth, logicalHeight);

      const { x: px, y: py } = pointerRef.current;
      const dots = dotsRef.current;

      // Early return if no dots
      if (dots.length === 0) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      for (const dot of dots) {
        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;

        let style = baseColor;
        if (dsq <= proxSq) {
          const dist = Math.sqrt(dsq);
          const t = 1 - dist / proximity;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
          style = `rgb(${r},${g},${b})`;
        }

        ctx.save();
        ctx.translate(ox, oy);
        ctx.fillStyle = style;
        ctx.fill(circlePath);
        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      isDrawing = false;
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [proximity, baseColor, activeRgb, baseRgb, circlePath]);

  // Rebuild grid when props change
  useEffect(() => {
    buildGrid();
  }, [dotSize, gap, buildGrid]);

  // Setup ResizeObserver with stable callback
  useEffect(() => {
    // Initial build
    buildGrid();

    let ro: ResizeObserver | null = null;
    let resizeTimeout: ReturnType<typeof setTimeout>;
    
    const handleResize = () => {
      // Debounce resize events
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        buildGrid();
      }, 100);
    };

    if ('ResizeObserver' in window && wrapperRef.current) {
      ro = new ResizeObserver((entries) => {
        // Only rebuild if dimensions actually changed
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          if (width > 0 && height > 0) {
            handleResize();
          }
        }
      });
      ro.observe(wrapperRef.current);
    } else {
      window.addEventListener('resize', handleResize, { passive: true });
    }

    return () => {
      clearTimeout(resizeTimeout);
      if (ro) {
        ro.disconnect();
      } else {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [buildGrid]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      const pr = pointerRef.current;
      const dt = pr.lastTime ? now - pr.lastTime : 16;
      const dx = e.clientX - pr.lastX;
      const dy = e.clientY - pr.lastY;
      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);

      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        vx *= scale;
        vy *= scale;
        speed = maxSpeed;
      }

      pr.lastTime = now;
      pr.lastX = e.clientX;
      pr.lastY = e.clientY;
      pr.vx = vx;
      pr.vy = vy;
      pr.speed = speed;

      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      // Mouse coordinates are already in logical space (matching canvas.style dimensions)
      pr.x = e.clientX - rect.left;
      pr.y = e.clientY - rect.top;

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);
        if (speed > speedTrigger && dist < proximity && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          const pushX = dot.cx - pr.x + vx * 0.005;
          const pushY = dot.cy - pr.y + vy * 0.005;
          if (hasInertiaPlugin) {
            gsap.to(dot, {
              inertia: { xOffset: pushX, yOffset: pushY, resistance },
              onComplete: () => {
                gsap.to(dot, {
                  xOffset: 0,
                  yOffset: 0,
                  duration: returnDuration,
                  ease: 'elastic.out(1,0.75)'
                });
                dot._inertiaApplied = false;
              }
            });
          } else {
            // Fallback animation without InertiaPlugin
            gsap.to(dot, {
              xOffset: pushX,
              yOffset: pushY,
              duration: 0.3,
              ease: 'power2.out',
              onComplete: () => {
                gsap.to(dot, {
                  xOffset: 0,
                  yOffset: 0,
                  duration: returnDuration,
                  ease: 'elastic.out(1,0.75)'
                });
                dot._inertiaApplied = false;
              }
            });
          }
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      // Mouse coordinates are already in logical space (matching canvas.style dimensions)
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < shockRadius && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          const falloff = Math.max(0, 1 - dist / shockRadius);
          const pushX = (dot.cx - cx) * shockStrength * falloff;
          const pushY = (dot.cy - cy) * shockStrength * falloff;
          if (hasInertiaPlugin) {
            gsap.to(dot, {
              inertia: { xOffset: pushX, yOffset: pushY, resistance },
              onComplete: () => {
                gsap.to(dot, {
                  xOffset: 0,
                  yOffset: 0,
                  duration: returnDuration,
                  ease: 'elastic.out(1,0.75)'
                });
                dot._inertiaApplied = false;
              }
            });
          } else {
            // Fallback animation without InertiaPlugin
            gsap.to(dot, {
              xOffset: pushX,
              yOffset: pushY,
              duration: 0.3,
              ease: 'power2.out',
              onComplete: () => {
                gsap.to(dot, {
                  xOffset: 0,
                  yOffset: 0,
                  duration: returnDuration,
                  ease: 'elastic.out(1,0.75)'
                });
                dot._inertiaApplied = false;
              }
            });
          }
        }
      }
    };

    const throttledMove = throttle(onMove, 50);
    window.addEventListener('mousemove', throttledMove, { passive: true });
    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('mousemove', throttledMove);
      window.removeEventListener('click', onClick);
    };
  }, [maxSpeed, speedTrigger, proximity, resistance, returnDuration, shockRadius, shockStrength]);

  return (
    <div className={`h-full w-full relative ${className}`} style={style}>
      <div ref={wrapperRef} className="w-full h-full relative">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }} />
      </div>
    </div>
  );
};

export default DotGrid;

