import BackgroundTimer from 'react-native-background-timer';
import { useCallback } from 'react';

import { useAppDispatch } from '@store/redux';
import { increment, reset } from '@store/timerSlice';

export default function useTimer() {
  const dispatch = useAppDispatch();

  const start = useCallback(() => {
    BackgroundTimer.runBackgroundTimer(() => {
      dispatch(increment());
    }, 100);
  }, [dispatch]);

  const pause = useCallback(() => {
    BackgroundTimer.stopBackgroundTimer();
  }, []);

  const stop = useCallback(() => {
    BackgroundTimer.stopBackgroundTimer();
    dispatch(reset());
  }, [dispatch]);

  return { start, stop, pause };
}
