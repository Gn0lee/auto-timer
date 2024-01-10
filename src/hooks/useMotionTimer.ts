import { useCallback, useMemo, useEffect, useState } from 'react';
import { Accelerometer } from 'expo-sensors';

import { useAppDispatch, useAppSelector } from '@store/redux';
import Timer from '@class/Timer';

import {
  pauseByButton,
  stop as stopReducer,
  start as startReducer,
  increment,
  pauseByMotion,
} from '@store/motionTimerSlice';

export default function useMotionTimer() {
  const dispatch = useAppDispatch();

  const [subscription, setSubscription] = useState<ReturnType<typeof Accelerometer.addListener>>();

  const { mode } = useAppSelector((state) => state.motion);

  const timer = useMemo(() => new Timer(999), []);

  useEffect(() => {
    if (mode === 'pause-motion') {
      timer.pause();
    }

    if (mode === 'running') {
      timer.start(() => {
        dispatch(increment(timer.interval));
      });
    }
  }, [mode, timer, dispatch]);

  const start = useCallback(() => {
    dispatch(startReducer());

    setSubscription(
      Accelerometer.addListener((listener) => {
        const { z } = listener;

        if (z < -0.9) {
          dispatch(pauseByMotion());
        }

        if (z > 0.9) {
          dispatch(startReducer());
        }
      })
    );

    Accelerometer.setUpdateInterval(1000);
  }, [dispatch]);

  const pause = useCallback(() => {
    timer.pause(() => {
      dispatch(pauseByButton());

      if (subscription) {
        subscription.remove();
      }
    });
  }, [timer, dispatch, subscription]);

  const stop = useCallback(() => {
    timer.stop(() => {
      dispatch(stopReducer());

      if (subscription) {
        subscription.remove();
      }
    });
  }, [dispatch, timer, subscription]);

  return { start, stop, pause };
}
