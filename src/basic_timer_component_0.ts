import React, { useState, useEffect } from 'react';

interface TimerState {
  timeLeft: number;
  isRunning: boolean;
  mode: 'work' | 'break';
}

const PomodoroTimer: React.FC = () => {
  const [timerState, setTimerState] = useState<TimerState>({
    timeLeft: 25 * 60,
    isRunning: false,
    mode: 'work'
  });

  const workDuration = 25 * 60;
  const breakDuration = 5 * 60;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (timerState.isRunning && timerState.timeLeft > 0) {
      interval = setInterval(() => {
        setTimerState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);
    } else if (timerState.isRunning && timerState.timeLeft === 0) {
      // Switch mode when time is up
      setTimerState(prev => ({
        timeLeft: prev.mode === 'work' ? breakDuration : workDuration,
        isRunning: false,
        mode: prev.mode === 'work' ? 'break' : 'work'
      }));
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerState.isRunning, timerState.timeLeft, timerState.mode]);

  const toggleTimer = () => {
    setTimerState(prev => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const resetTimer = () => {
    setTimerState({
      timeLeft: workDuration,
      isRunning: false,
      mode: 'work'
    });
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="pomodoro-timer">
      <h2>{timerState.mode === 'work' ? 'Focus Time' : 'Break Time'}</h2>
      <div className="timer-display">{formatTime(timerState.timeLeft)}</div>
      <div className="timer-controls">
        <button onClick={toggleTimer}>
          {timerState.isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
