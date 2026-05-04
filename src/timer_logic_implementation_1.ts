export interface TimerState {
  timeLeft: number;
  isRunning: boolean;
  isBreak: boolean;
  pomodoroCount: number;
}

export interface TimerActions {
  start: () => void;
  pause: () => void;
  reset: () => void;
  switchMode: () => void;
}

export const useTimerLogic = (): [TimerState, TimerActions] => {
  const [state, setState] = React.useState<TimerState>({
    timeLeft: 25 * 60,
    isRunning: false,
    isBreak: false,
    pomodoroCount: 0
  });

  const start = () => setState(prev => ({ ...prev, isRunning: true }));
  const pause = () => setState(prev => ({ ...prev, isRunning: false }));
  const reset = () => {
    setState({
      timeLeft: 25 * 60,
      isRunning: false,
      isBreak: false,
      pomodoroCount: 0
    });
  };
  
  const switchMode = () => {
    setState(prev => ({
      timeLeft: prev.isBreak ? 25 * 60 : 5 * 60,
      isRunning: false,
      isBreak: !prev.isBreak,
      pomodoroCount: prev.isBreak ? prev.pomodoroCount + 1 : prev.pomodoroCount
    }));
  };

  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (state.isRunning && state.timeLeft > 0) {
      interval = setInterval(() => {
        setState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (state.timeLeft === 0) {
      pause();
      if (state.isBreak) {
        setState(prev => ({ ...prev, isBreak: false, timeLeft: 25 * 60 }));
      } else {
        setState(prev => ({ ...prev, isBreak: true, timeLeft: 5 * 60 }));
      }
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.isRunning, state.timeLeft]);

  return [state, { start, pause, reset, switchMode }];
};
