import React, { lazy } from 'react';

/**
 * Lazy load with artificial delay for demo purposes
 * Set DELAY_MS to 0 for production, or 500-1000ms to see shimmer effects
 */
const DELAY_MS = 1000; // Change to 0 in production

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Wrapper for React.lazy() with optional delay to visualize loading states
 * Usage: const Component = lazyWithDelay(() => import('./Component'));
 */
export const lazyWithDelay = <T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
) => {
  return lazy(async () => {
    if (DELAY_MS > 0) {
      await delay(DELAY_MS);
    }
    return importFn();
  });
};

