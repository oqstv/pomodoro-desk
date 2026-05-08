import { useEffect, useRef } from 'react';

export const useAccessibilityImprovements = () => {
  const timerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timerElement = timerRef.current;
    if (!timerElement) return;

    timerElement.setAttribute('role', 'timer');
    timerElement.setAttribute('aria-live', 'polite');
    timerElement.setAttribute('aria-label', 'Pomodoro timer');

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        timerElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return timerRef;
};
