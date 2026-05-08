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

  const timerDisplay = document.getElementById('timer-display');
  if (timerDisplay) {
    timerDisplay.setAttribute('aria-live', 'polite');
    timerDisplay.setAttribute('aria-label', 'Pomodoro timer countdown');
  }

  const startButton = document.getElementById('start-button');
  const stopButton = document.getElementById('stop-button');
  const resetButton = document.getElementById('reset-button');

  if (startButton) startButton.setAttribute('aria-label', 'Start timer');
  if (stopButton) stopButton.setAttribute('aria-label', 'Stop timer');
  if (resetButton) resetButton.setAttribute('aria-label', 'Reset timer');
};
