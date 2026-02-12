// Browser polyfills for older devices (must be before any React code)
// Polyfill for Element.closest() - supports older Android/iOS browsers
if (!Element.prototype.closest) {
  Element.prototype.closest = function (selector: string) {
    let el: Element | null = this;
    while (el && el.nodeType === 1) {
      if (el.matches(selector)) return el;
      el = el.parentElement;
    }
    return null;
  };
}

// Polyfill for Element.matches() - required by closest()
if (!Element.prototype.matches) {
  Element.prototype.matches =
    (Element.prototype as any).msMatchesSelector ||
    (Element.prototype as any).webkitMatchesSelector;
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
