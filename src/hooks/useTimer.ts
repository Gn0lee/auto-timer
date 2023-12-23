import { useCallback, useMemo, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

import { useAppDispatch } from '@store/redux';
import { increment, reset, setLastTimeBackground, updateElapsedTime } from '@store/timerSlice';
import Timer from '@class/Timer';

export default function useTimer() {
  const dispatch = useAppDispatch();

  const timer = useMemo(() => new Timer(100), []);

  useEffect(() => {
    const handleAppStateChange = (nextState: AppStateStatus) => {
      if (nextState === 'active') {
        timer.restart(() => {
          dispatch(updateElapsedTime());
        });
        return;
      }

      if (nextState === 'inactive' || nextState === 'background') {
        timer.pause(() => {
          dispatch(setLastTimeBackground(new Date().getTime()));
        });
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [dispatch, timer]);

  const start = useCallback(() => {
    timer.start(() => {
      dispatch(increment());
    });
  }, [dispatch, timer]);

  const pause = useCallback(() => {
    timer.pause();
  }, [timer]);

  const stop = useCallback(() => {
    timer.stop(() => {
      dispatch(reset());
    });
  }, [dispatch, timer]);

  return { start, stop, pause };
}
