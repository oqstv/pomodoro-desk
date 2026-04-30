import React, { useState, useEffect } from 'react';

interface TimerState {
  timeLeft: number;
  isRunning: boolean;
  mode: 'work' | 'break';
}

const PomodoroTimer: React.FC = () => {
  const [timer, setTimer] = useState<TimerState>({
    timeLeft: 25 * 60,
    isRunning: false,
    mode: 'work'
  });

  const workDuration = 25 * 60;
  const breakDuration = 5 * 60;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (timer.isRunning && timer.timeLeft > 0) {
      interval = setInterval(() => {
        setTimer(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);
    } else if (timer.isRunning && timer.timeLeft === 0) {
      // Switch between work and break modes
      setTimer(prev => ({
        timeLeft: prev.mode === 'work' ? breakDuration : workDuration,
        isRunning: false,
        mode: prev.mode === 'work' ? 'break' : 'work'
      }));
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer.isRunning, timer.timeLeft, timer.mode]);

  const toggleTimer = () => {
    setTimer(prev => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const resetTimer = () => {
    setTimer({
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
      <h2>{timer.mode === 'work' ? 'Work Time' : 'Break Time'}</h2>
      <div className="timer-display">{formatTime(timer.timeLeft)}</div>
      <div className="timer-controls">
        <button onClick={toggleTimer}>
          {timer.isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
