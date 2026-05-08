import { useEffect, useRef } from 'react';

export const useAccessibilityImprovements = () => {
  const timerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timerElement = timerRef.current;
    if (!timerElement) return;

    // Add ARIA labels
    timerElement.setAttribute('role', 'timer');
    timerElement.setAttribute('aria-label', 'Pomodoro timer');
    
    // Enable keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        timerElement.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return timerRef;
};
