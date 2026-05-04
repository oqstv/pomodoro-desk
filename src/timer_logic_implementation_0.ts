import { useState, useEffect, useRef } from 'react';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';
type TimerState = 'idle' | 'running' | 'paused';

interface TimerSettings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
}

interface TimerData {
  mode: TimerMode;
  timeLeft: number;
  state: TimerState;
  sessionCount: number;
}

export const useTimer = (settings: TimerSettings) => {
  const [timerData, setTimerData] = useState<TimerData>({
    mode: 'work',
    timeLeft: settings.workDuration,
    state: 'idle',
    sessionCount: 0
  });
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const startTimer = () => {
    setTimerData(prev => ({ ...prev, state: 'running' }));
  };
  
  const pauseTimer = () => {
    setTimerData(prev => ({ ...prev, state: 'paused' }));
  };
  
  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTimerData({
      mode: 'work',
      timeLeft: settings.workDuration,
      state: 'idle',
      sessionCount: 0
    });
  };
  
  const switchMode = (mode: TimerMode) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTimerData({
      mode,
      timeLeft: 
        mode === 'work' ? settings.workDuration :
        mode === 'shortBreak' ? settings.shortBreakDuration :
        settings.longBreakDuration,
      state: 'idle',
      sessionCount: timerData.sessionCount
    });
  };
  
  useEffect(() => {
    if (timerData.state === 'running' && timerData.timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimerData(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (timerData.state === 'running' && timerData.timeLeft === 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // Handle mode transition
      if (timerData.mode === 'work') {
        const newSessionCount = timerData.sessionCount + 1;
        const newMode = newSessionCount % settings.longBreakInterval === 0 
          ? 'longBreak' 
          : 'shortBreak';
        setTimerData({
          mode: newMode,
          timeLeft: 
            newMode === 'shortBreak' 
              ? settings.shortBreakDuration 
              : settings.longBreakDuration,
          state: 'idle',
          sessionCount: newSessionCount
        });
      } else {
        setTimerData({
          mode: 'work',
          timeLeft: settings.workDuration,
          state: 'idle',
          sessionCount: timerData.sessionCount
        });
      }
    } else if (timerData.state === 'paused' || timerData.state === 'idle') {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerData.state, timerData.timeLeft, timerData.mode, timerData.sessionCount]);
  
  return {
    ...timerData,
    startTimer,
    pauseTimer,
    resetTimer,
    switchMode
  };
};
