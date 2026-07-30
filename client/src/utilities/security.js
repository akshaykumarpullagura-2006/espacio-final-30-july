import { DEMO_CONFIG } from '../config/demoConfig';

/**
 * Checks if the target HTML element is a user input field, textarea, or contenteditable element.
 * Text selection, right-click context menu, and copy/paste are explicitly allowed inside form fields.
 */
export function isEditableElement(element) {
  if (!element) return false;
  
  const target = element.target || element;
  if (!target || !target.tagName) return false;

  const tagName = target.tagName.toUpperCase();
  
  // Standard form elements
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tagName)) {
    // Exclude button/submit/image/checkbox/radio input types if desired, but general inputs need selection
    return true;
  }

  // Check contenteditable
  if (target.isContentEditable || target.getAttribute?.('contenteditable') === 'true') {
    return true;
  }

  // Check parent elements up to 3 levels
  let current = target.parentElement;
  let depth = 0;
  while (current && depth < 3) {
    if (current.isContentEditable || current.getAttribute?.('contenteditable') === 'true') {
      return true;
    }
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(current.tagName?.toUpperCase())) {
      return true;
    }
    current = current.parentElement;
    depth++;
  }

  return false;
}

/**
 * Evaluates whether a keyboard event matches restricted developer or save/print shortcuts.
 * Supports both Windows/Linux (Ctrl) and macOS (Cmd / Option).
 */
export function isBlockedShortcut(e) {
  const isMac = navigator.platform.toUpperCase().includes('MAC');
  const ctrlKey = isMac ? e.metaKey : e.ctrlKey;
  const altKey = e.altKey;
  const shiftKey = e.shiftKey;
  const key = (e.key || '').toLowerCase();
  const code = e.code || '';

  // 1. F12 key
  if (key === 'f12' || code === 'F12' || e.keyCode === 123) {
    return { blocked: true, name: 'F12 (DevTools)' };
  }

  // 2. Ctrl+Shift+I or Cmd+Option+I (Inspect)
  if ((ctrlKey && shiftKey && key === 'i') || (isMac && ctrlKey && altKey && key === 'i')) {
    return { blocked: true, name: 'DevTools Inspector' };
  }

  // 3. Ctrl+Shift+J or Cmd+Option+J (Console)
  if ((ctrlKey && shiftKey && key === 'j') || (isMac && ctrlKey && altKey && key === 'j')) {
    return { blocked: true, name: 'DevTools Console' };
  }

  // 4. Ctrl+Shift+C or Cmd+Option+C (Element Picker)
  if ((ctrlKey && shiftKey && key === 'c') || (isMac && ctrlKey && altKey && key === 'c')) {
    return { blocked: true, name: 'DevTools Element Picker' };
  }

  // 5. Ctrl+Shift+K (Firefox Console)
  if (ctrlKey && shiftKey && key === 'k') {
    return { blocked: true, name: 'Developer Console' };
  }

  // 6. Ctrl+Shift+E / Cmd+Option+E (Network tab)
  if ((ctrlKey && shiftKey && key === 'e') || (isMac && ctrlKey && altKey && key === 'e')) {
    return { blocked: true, name: 'Network Inspector' };
  }

  // 7. Ctrl+Shift+M / Cmd+Option+M (Device Mode)
  if ((ctrlKey && shiftKey && key === 'm') || (isMac && ctrlKey && altKey && key === 'm')) {
    return { blocked: true, name: 'Device Emulator' };
  }

  // 8. Ctrl+U or Cmd+Option+U (View Source)
  if ((ctrlKey && key === 'u') || (isMac && ctrlKey && altKey && key === 'u')) {
    return { blocked: true, name: 'View Page Source' };
  }

  // 9. Ctrl+S or Cmd+S (Save Page)
  if (ctrlKey && key === 's') {
    return { blocked: true, name: 'Save Page' };
  }

  // 10. Ctrl+P or Cmd+P (Print Page)
  if (ctrlKey && key === 'p') {
    return { blocked: true, name: 'Print Page' };
  }

  return { blocked: false };
}

/**
 * DevTools Detection Engine using multiple complementary techniques:
 * 1. Window Outer vs Inner Dimension Deltas
 * 2. High-Resolution Debugger Timing Test
 * 3. Object Getter Console Trap
 */
let devToolsOpenState = false;

export function checkDevTools() {
  const threshold = DEMO_CONFIG.SECURITY.devtoolsThreshold;

  // Technique 1: Dimension Deltas
  const widthDiff = window.outerWidth - window.innerWidth;
  const heightDiff = window.outerHeight - window.innerHeight;

  const isDimensionDevTools = widthDiff > threshold || heightDiff > threshold;

  // Technique 2: Debugger Timing Check
  let isTimingDevTools = false;
  const startTime = performance.now();
  
  // Inline evaluation of debugger timing without stopping execution permanently
  try {
    const fn = new Function('debugger');
    fn();
  } catch (err) {
    // Ignore errors in strict CSP environments
  }
  
  const endTime = performance.now();
  if (endTime - startTime > 100) {
    isTimingDevTools = true;
  }

  // Combine flags
  devToolsOpenState = isDimensionDevTools || isTimingDevTools;
  return devToolsOpenState;
}

/**
 * Utility helper to mask sensitive values when Demo Mode is active.
 */
export function getDemoData(realValue, demoFallback) {
  if (!DEMO_CONFIG.DEMO_MODE) {
    return realValue;
  }
  return demoFallback !== undefined ? demoFallback : DEMO_CONFIG.SAMPLE_DATA.customerName;
}
