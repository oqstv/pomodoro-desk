/**
 * Pomodoro Desk - Time Management Application
 * 
 * A productivity application built with React, TypeScript, and Vite that implements
 * the Pomodoro Technique for focused work sessions and breaks.
 * 
 * Features:
 * - Configurable work and break timers
 * - Session tracking and statistics
 * - Customizable theme options
 * - Responsive design for all devices
 * 
 * @fileoverview Documentation setup for the Pomodoro Desk application
 * @author Pomodoro Desk Team
 * @version 1.0.0
 */

/**
 * Timer configuration interface
 * Defines the structure for timer settings
 */
export interface TimerConfig {
  workDuration: number;
  breakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
}

/**
 * Session statistics interface
 * Tracks user productivity data
 */
export interface SessionStats {
  completedSessions: number;
  totalWorkTime: number;
  totalBreakTime: number;
  focusPercentage: number;
}

/**
 * Theme configuration interface
 * Defines available application themes
 */
export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
}

/**
 * Application state interface
 * Represents the complete application state
 */
export interface AppState {
  timer: TimerConfig;
  stats: SessionStats;
  theme: ThemeConfig;
  isRunning: boolean;
  currentMode: 'work' | 'break' | 'longBreak';
  timeLeft: number;
}
