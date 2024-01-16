import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FaceTimerMode = 'running' | 'pause-button' | 'stop' | 'pause-face';

interface FaceTimerState {
  time: number;
  mode: FaceTimerMode;
  faceDetectionTimeout?: ReturnType<typeof setTimeout>;
}

const initialState: FaceTimerState = {
  time: 0,
  mode: 'stop',
  faceDetectionTimeout: undefined,
};

export const faceTimerSlice = createSlice({
  name: 'face-timer',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      return { ...state, time: state.time + action.payload };
    },
    pauseByButton: (state) => {
      return { ...state, mode: 'pause-button' };
    },
    pauseByFace: (state) => {
      return { ...state, mode: 'pause-face' };
    },
    stop: (state) => {
      return { ...state, time: 0, mode: 'stop' };
    },
    start: (state) => {
      return { ...state, mode: 'running' };
    },
    setFaceDetectionTimeout: (
      state,
      action: PayloadAction<FaceTimerState['faceDetectionTimeout']>
    ) => {
      return { ...state, faceDetectionTimeout: action.payload };
    },
  },
});

export const { increment, start, pauseByButton, pauseByFace, stop, setFaceDetectionTimeout } =
  faceTimerSlice.actions;

export default faceTimerSlice.reducer;
