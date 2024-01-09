import { useCallback, useMemo, useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import {
  DeviceMotion,
  DeviceMotionMeasurement,
  AccelerometerMeasurement,
  Accelerometer,
} from 'expo-sensors';

import { useAppDispatch, useAppSelector } from '@store/redux';
import Timer from '@class/Timer';
import { pauseByBackground, updateElapsedTime } from '@store/motionTimerSlice';

export default function useMotionTimer() {
  const dispatch = useAppDispatch();

  const { mode } = useAppSelector((state) => state.motion);

  const timer = useMemo(() => new Timer(999), []);

  useEffect(() => {
    const deviceMotionListener = (listener: AccelerometerMeasurement) => {
      console.log(listener.x, listener.y, listener.z);
    };

    const deviceMotionSubscription = Accelerometer.addListener(deviceMotionListener);

    return () => {
      Accelerometer.removeSubscription(deviceMotionSubscription);
    };
  }, []);
}
