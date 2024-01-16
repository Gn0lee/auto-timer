import { useCallback, useMemo, useEffect, useState } from 'react';
import { deactivateKeepAwake, activateKeepAwakeAsync } from 'expo-keep-awake';
import { addBatteryLevelListener, getBatteryLevelAsync } from 'expo-battery';
import { Alert } from 'react-native';

import { useAppDispatch, useAppSelector } from '@store/redux';
import Timer from '@class/Timer';

import {
  pauseByButton,
  stop as stopReducer,
  start as startReducer,
  increment,
  setFaceDetectionTimeout,
} from '@store/faceTimerSlice';

export default function useFaceTimer() {
  const dispatch = useAppDispatch();

  const [expoBatterySubscription, setExpoBatterySubscription] =
    useState<ReturnType<typeof addBatteryLevelListener>>();

  const { mode } = useAppSelector((state) => state.face);

  const timer = useMemo(() => new Timer(999), []);

  useEffect(() => {
    if (mode === 'pause-face') {
      timer.pause();
    }

    if (mode === 'running') {
      activateKeepAwakeAsync();

      timer.start(() => {
        dispatch(increment(timer.interval));
      });
    }

    if (mode === 'stop') {
      timer.stop();
    }
  }, [mode, timer, dispatch]);

  const start = useCallback(async () => {
    const batteryLevel = await getBatteryLevelAsync();

    if (batteryLevel < 0.2) {
      Alert.alert('배터리 부족', '기기를 충전해 주세요', [{ text: '확인' }]);
      return;
    }

    dispatch(startReducer());

    setExpoBatterySubscription(
      addBatteryLevelListener((listener) => {
        if (listener.batteryLevel < 0.65) {
          dispatch(pauseByButton());
        }
      })
    );
  }, [dispatch]);

  useEffect(() => {
    return () => {
      expoBatterySubscription?.remove();
    };
  }, [expoBatterySubscription]);

  const pause = useCallback(() => {
    deactivateKeepAwake();

    timer.pause(() => {
      dispatch(pauseByButton());
      dispatch(setFaceDetectionTimeout(undefined));

      setExpoBatterySubscription(undefined);
    });
  }, [timer, dispatch]);

  const stop = useCallback(() => {
    dispatch(stopReducer());
    dispatch(setFaceDetectionTimeout(undefined));

    deactivateKeepAwake();

    setExpoBatterySubscription(undefined);
  }, [dispatch]);

  return { start, stop, pause };
}
