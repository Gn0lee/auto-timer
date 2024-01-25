import { useCallback, useMemo } from 'react';

import { useAppDispatch } from '@store/redux';
import { increment, reset } from '@store/basicTimerSlice';
import Timer from '@class/Timer';

export default function useBasicTimer() {
  const dispatch = useAppDispatch();

  const timer = useMemo(() => new Timer(999), []);

  const start = useCallback(() => {
    timer.start(() => {
      dispatch(increment(timer.interval));
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
