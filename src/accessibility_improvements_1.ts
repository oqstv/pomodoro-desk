import { useEffect } from 'react';

export const useAccessibilityImprovements = () => {
  useEffect(() => {
    // Add ARIA labels to timer controls
    const timerButtons = document.querySelectorAll('[data-testid="timer-button"]');
    timerButtons.forEach(button => {
      button.setAttribute('aria-label', button.textContent || 'Timer control');
    });

    // Enable keyboard navigation for timer controls
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        (e.target as HTMLElement).click();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
};
