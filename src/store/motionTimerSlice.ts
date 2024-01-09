import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type MotionTimerMode =
  | 'running'
  | 'pause-button'
  | 'stop'
  | 'pause-motion'
  | 'pause-background';

interface MotionTimerState {
  time: number;
  mode: MotionTimerMode;
  lastTimeBackground: number | null;
  backgroundMode?: MotionTimerMode;
}

const initialState: MotionTimerState = {
  time: 0,
  mode: 'stop',
  lastTimeBackground: null,
  backgroundMode: undefined,
};

export const motionTimerSlice = createSlice({
  name: 'motion-timer',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      return { ...state, time: state.time + action.payload };
    },
    pauseByButton: (state) => {
      return { ...state, mode: 'pause-button' };
    },
    pauseByMotion: (state) => {
      return { ...state, mode: 'pause-motion' };
    },
    pauseByBackground: (state) => {
      return {
        ...state,
        lastTimeBackground: new Date().getTime(),
        backgroundMode: state.mode,
        mode: 'pause-background',
      };
    },
    stop: (state) => {
      return { ...state, time: 0, mode: 'stop' };
    },
    start: (state) => {
      return { ...state, mode: 'running' };
    },
    updateElapsedTime: (state) => {
      return {
        ...state,
        time: state.time + (new Date().getTime() - (state.lastTimeBackground || 0)),
        lastTimeBackground: null,
        backgroundMode: undefined,
        mode: state.backgroundMode || 'pause-button',
      };
    },
  },
});

export const {
  increment,
  start,
  pauseByButton,
  pauseByMotion,
  stop,
  pauseByBackground,
  updateElapsedTime,
} = motionTimerSlice.actions;

export default motionTimerSlice.reducer;
