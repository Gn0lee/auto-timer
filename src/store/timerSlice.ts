import { createSlice } from '@reduxjs/toolkit';

interface TimerState {
  time: number;
}

const initialState: TimerState = {
  time: 0,
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    increment: (state) => {
      return { ...state, time: state.time + 100 };
    },
    reset: (state) => {
      return { ...state, time: 0 };
    },
  },
});

export const { increment, reset } = timerSlice.actions;

export default timerSlice.reducer;
