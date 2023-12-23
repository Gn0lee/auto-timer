import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimerState {
  time: number;
  lastTimeBackground: number | null;
}

const initialState: TimerState = {
  time: 0,
  lastTimeBackground: null,
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    increment: (state) => {
      return { ...state, time: state.time + 100 };
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
  },
});

export const {
  increment,
  reset,
  resetLastTimeBackground,
  updateElapsedTime,
  setLastTimeBackground,
} = timerSlice.actions;

export default timerSlice.reducer;
