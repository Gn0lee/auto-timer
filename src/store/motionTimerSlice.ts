import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type MotionTimerMode = 'running' | 'pause-button' | 'stop' | 'pause-motion';

interface MotionTimerState {
  time: number;
  mode: MotionTimerMode;
}

const initialState: MotionTimerState = {
  time: 0,
  mode: 'stop',
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
    stop: (state) => {
      return { ...state, time: 0, mode: 'stop' };
    },
    start: (state) => {
      return { ...state, mode: 'running' };
    },
  },
});

export const { increment, start, pauseByButton, pauseByMotion, stop } = motionTimerSlice.actions;

export default motionTimerSlice.reducer;
