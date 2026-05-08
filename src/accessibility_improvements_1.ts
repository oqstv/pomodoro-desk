import { useEffect } from 'react';

export const useAccessibilityImprovements = () => {
  useEffect(() => {
    // Add ARIA labels to timer elements
    const timerElements = document.querySelectorAll('[data-testid="timer"]');
    timerElements.forEach(element => {
      element.setAttribute('aria-label', 'Pomodoro timer');
    });

    // Add keyboard navigation support
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement?.hasAttribute('data-action')) {
          e.preventDefault();
          (activeElement as HTMLButtonElement).click();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
};
