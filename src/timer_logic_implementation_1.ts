export interface TimerState {
  timeLeft: number;
  isRunning: boolean;
  isBreak: boolean;
  cycles: number;
}

export interface TimerActions {
  start: () => void;
  pause: () => void;
  reset: () => void;
  skip: () => void;
}

export const useTimerLogic = (workDuration: number, breakDuration: number): [TimerState, TimerActions] => {
  const [state, setState] = React.useState<TimerState>({
    timeLeft: workDuration,
    isRunning: false,
    isBreak: false,
    cycles: 0
  });

  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    setState(prev => ({ ...prev, isRunning: true }));
  };

  const pause = () => {
    setState(prev => ({ ...prev, isRunning: false }));
  };

  const reset = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setState({
      timeLeft: workDuration,
      isRunning: false,
      isBreak: false,
      cycles: 0
    });
  };

  const skip = () => {
    if (state.isBreak) {
      setState({
        timeLeft: workDuration,
        isRunning: false,
        isBreak: false,
        cycles: state.cycles
      });
    } else {
      setState({
        timeLeft: breakDuration,
        isRunning: false,
        isBreak: true,
        cycles: state.cycles + 1
      });
    }
  };

  React.useEffect(() => {
    if (state.isRunning) {
      timerRef.current = setInterval(() => {
        setState(prev => {
          if (prev.timeLeft <= 1) {
            if (prev.isBreak) {
              return {
                timeLeft: workDuration,
                isRunning: false,
                isBreak: false,
                cycles: prev.cycles + 1
              };
            } else {
              return {
                timeLeft: breakDuration,
                isRunning: false,
                isBreak: true,
                cycles: prev.cycles
              };
            }
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state.isRunning, state.isBreak, state.timeLeft]);

  return [state, { start, pause, reset, skip }];
};
