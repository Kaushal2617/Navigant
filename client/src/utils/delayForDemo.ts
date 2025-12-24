/**
 * Utility function to add artificial delay for demo purposes
 * Remove this in production or set to 0
 */

export const delay = (ms: number = 0): Promise<void> => {
  // Set to 0 for production, or use a small delay for demo (e.g., 500-1000ms)
  // This helps visualize lazy loading and shimmer effects
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Wrapper for lazy imports with optional delay for demo
 */
export const lazyWithDelay = <T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  delayMs: number = 500
): React.LazyExoticComponent<T> => {
  return React.lazy(async () => {
    await delay(delayMs);
    return importFn();
  });
};

// Note: Import React if using lazyWithDelay
// import React from 'react';

