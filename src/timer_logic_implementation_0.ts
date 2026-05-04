export type TimerState = 'idle' | 'working' | 'break';
export type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';

export interface TimerSettings {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  longBreakInterval: number;
}

export interface TimerStateData {
  state: TimerState;
  mode: TimerMode;
  timeLeft: number;
  isRunning: boolean;
  pomodorosCompleted: number;
}

export class TimerLogic {
  private settings: TimerSettings;
  private state: TimerStateData;
  private intervalId: number | null = null;
  private onStateChange: (state: TimerStateData) => void;

  constructor(
    settings: TimerSettings,
    initialState: Partial<TimerStateData> = {},
    onStateChange: (state: TimerStateData) => void
  ) {
    this.settings = settings;
    this.onStateChange = onStateChange;
    this.state = {
      state: initialState.state || 'idle',
      mode: initialState.mode || 'pomodoro',
      timeLeft: initialState.timeLeft || settings.pomodoro,
      isRunning: initialState.isRunning || false,
      pomodorosCompleted: initialState.pomodorosCompleted || 0,
    };
  }

  private resetTimer(): void {
    const timeLeft = this.settings[this.state.mode];
    this.state = {
      ...this.state,
      timeLeft,
      isRunning: false,
    };
    this.onStateChange(this.state);
  }

  private transitionToNextMode(): void {
    if (this.state.mode === 'pomodoro') {
      const isLongBreak = (this.state.pomodorosCompleted + 1) % this.settings.longBreakInterval === 0;
      const nextMode = isLongBreak ? 'longBreak' : 'shortBreak';
      
      this.state = {
        ...this.state,
        mode: nextMode,
        pomodorosCompleted: this.state.pomodorosCompleted + 1,
        state: 'break',
      };
    } else {
      this.state = {
        ...this.state,
        mode: 'pomodoro',
        state: 'working',
      };
    }
    
    this.resetTimer();
  }

  public start(): void {
    if (this.state.isRunning) return;
    
    this.state = {
      ...this.state,
      isRunning: true,
    };
    this.onStateChange(this.state);
    
    this.intervalId = window.setInterval(() => {
      this.state = {
        ...this.state,
        timeLeft: this.state.timeLeft - 1,
      };
      
      if (this.state.timeLeft <= 0) {
        this.stop();
        this.transitionToNextMode();
        return;
      }
      
      this.onStateChange(this.state);
    }, 1000);
  }

  public stop(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    this.state = {
      ...this.state,
      isRunning: false,
    };
    this.onStateChange(this.state);
  }

  public reset(): void {
    this.stop();
    this.state = {
      ...this.state,
      state: 'idle',
      isRunning: false,
      pomodorosCompleted: 0,
    };
    this.resetTimer();
  }

  public toggle(): void {
    if (this.state.isRunning) {
      this.stop();
    } else {
      this.start();
    }
  }

  public getState(): TimerStateData {
    return { ...this.state };
  }
}
