export const addAccessibilityImprovements = () => {
  const buttons = document.querySelectorAll('button[aria-label]');
  buttons.forEach(button => {
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  });

  const timers = document.querySelectorAll('[role="timer"]');
  timers.forEach(timer => {
    timer.setAttribute('aria-live', 'polite');
    timer.setAttribute('aria-atomic', 'true');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.querySelector('[aria-modal="true"]')) {
      document.querySelector('[aria-modal="true"]')?.setAttribute('aria-hidden', 'true');
    }
  });
};
