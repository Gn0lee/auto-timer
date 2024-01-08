import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BasicTimerState {
  time: number;
  lastTimeBackground: number | null;
  mode: 'stop' | 'running' | 'pause';
}

const initialState: BasicTimerState = {
  time: 0,
  lastTimeBackground: null,
  mode: 'stop',
};

export const basicTimerSlice = createSlice({
  name: 'basic-timer',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      return { ...state, time: state.time + action.payload };
    },
    updateElapsedTime: (state) => {
      return {
        ...state,
        time: state.time + (new Date().getTime() - (state.lastTimeBackground || 0)),
        lastTimeBackground: null,
      };
    },
    reset: (state) => {
      return { ...state, time: 0 };
    },
    setLastTimeBackground: (state, action: PayloadAction<number>) => {
      return { ...state, lastTimeBackground: action.payload };
    },
    resetLastTimeBackground: (state) => {
      return { ...state, lastTimeBackground: null };
    },
    setTimerMode: (state, action: PayloadAction<BasicTimerState['mode']>) => {
      return { ...state, mode: action.payload };
    },
  },
});

export const {
  increment,
  reset,
  resetLastTimeBackground,
  updateElapsedTime,
  setLastTimeBackground,
  setTimerMode,
} = basicTimerSlice.actions;

export default basicTimerSlice.reducer;
