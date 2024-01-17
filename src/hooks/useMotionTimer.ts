import { useCallback, useMemo, useEffect, useState } from 'react';
import { Accelerometer } from 'expo-sensors';
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
  pauseByMotion,
} from '@store/motionTimerSlice';

export default function useMotionTimer() {
  const dispatch = useAppDispatch();

  const [expoSensorSubscription, setExpoSensorSubscription] =
    useState<ReturnType<typeof Accelerometer.addListener>>();

  const [expoBatterySubscription, setExpoBatterySubscription] =
    useState<ReturnType<typeof addBatteryLevelListener>>();

  const { mode } = useAppSelector((state) => state.motion);

  const timer = useMemo(() => new Timer(999), []);

  useEffect(() => {
    if (mode === 'pause-motion') {
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

    if (batteryLevel !== -1 && batteryLevel < 0.2) {
      Alert.alert('배터리 부족', '기기를 충전해 주세요', [{ text: '확인' }]);
      return;
    }

    dispatch(startReducer());

    setExpoSensorSubscription(
      Accelerometer.addListener((listener) => {
        const { z } = listener;

        if (z < -0.8) {
          dispatch(pauseByMotion());
        }

        if (z > 0.9) {
          dispatch(startReducer());
        }
      })
    );

    setExpoBatterySubscription(
      addBatteryLevelListener((listener) => {
        if (listener.batteryLevel < 0.65) {
          dispatch(pauseByButton());
        }
      })
    );

    Accelerometer.setUpdateInterval(500);
  }, [dispatch]);

  useEffect(() => {
    return () => {
      expoSensorSubscription?.remove();
    };
  }, [expoSensorSubscription]);

  useEffect(() => {
    return () => {
      expoBatterySubscription?.remove();
    };
  }, [expoBatterySubscription]);

  const pause = useCallback(() => {
    deactivateKeepAwake();

    timer.pause(() => {
      dispatch(pauseByButton());

      setExpoSensorSubscription(undefined);

      setExpoBatterySubscription(undefined);
    });
  }, [timer, dispatch]);

  const stop = useCallback(() => {
    dispatch(stopReducer());

    deactivateKeepAwake();

    setExpoSensorSubscription(undefined);

    setExpoBatterySubscription(undefined);
  }, [dispatch]);

  return { start, stop, pause };
}
