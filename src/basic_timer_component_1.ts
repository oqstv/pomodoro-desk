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

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (timer.isRunning && timer.timeLeft > 0) {
      interval = setInterval(() => {
        setTimer(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);
    } else if (timer.timeLeft === 0) {
      setTimer(prev => ({
        ...prev,
        isRunning: false,
        mode: prev.mode === 'work' ? 'break' : 'work',
        timeLeft: prev.mode === 'work' ? 5 * 60 : 25 * 60
      }));
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer.isRunning, timer.timeLeft]);

  const toggleTimer = () => {
    setTimer(prev => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const resetTimer = () => {
    setTimer({
      timeLeft: 25 * 60,
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
