'use client';

import { useEffect } from 'react';

export default function SecurityGuard() {
  useEffect(() => {
    // Exclude local development from restrictions so it doesn't block your debugging
    if (process.env.NODE_ENV === 'development') {
      return;
    }

    // 1. Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Disable Developer Shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U, Ctrl+S)
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 key
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }

      // Ctrl + Shift + (I / J / C)
      if (
        e.ctrlKey &&
        e.shiftKey &&
        (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')
      ) {
        e.preventDefault();
        return false;
      }

      // Ctrl + U (View Source) & Ctrl + S (Save Page)
      if (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        return false;
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);

    // 3. Prevent Console pasting / log viewing (Self-XSS protection)
    const consoleInterval = setInterval(() => {
      console.clear();
      console.log(
        '%c⚠️ SECURITY ALERT ⚠️\n%cExecuting Javascript commands or viewing console data on this site is prohibited.',
        'color: #ef4444; font-size: 22px; font-weight: bold; padding: 4px;',
        'color: #f59e0b; font-size: 14px; padding: 4px;'
      );
    }, 1000);

    // 4. Infinite Debugger loop (Freezes DevTools if it gets opened anyway)
    const debuggerInterval = setInterval(() => {
      (function () {
        // Trigger a breakpoint that stalls DevTools execution panels
        debugger;
      })();
    }, 100);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(consoleInterval);
      clearInterval(debuggerInterval);
    };
  }, []);

  return null; // Component does not render any visible HTML
}
