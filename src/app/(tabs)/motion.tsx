import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { router } from 'expo-router';
import {
  DeviceMotion,
  DeviceMotionMeasurement,
  AccelerometerMeasurement,
  Accelerometer,
} from 'expo-sensors';

import { View, Text } from '@components/Themed';
import useGetDeviceMotionPermission from '@hooks/useGetDeviceMotionPermission';
import { ASYNC_STORAGE_VALUES, ASYNC_STORAGE_KEYS } from '@const/AsyncStorage';
import useMotionTimer from '@hooks/useMotionTimer';
import { Pressable } from 'react-native';

export default function Motion() {
  useGetDeviceMotionPermission();

  useMotionTimer();

  useEffect(() => {
    (async () => {
      try {
        const isMotionGuideOpen = await AsyncStorage.getItem(
          ASYNC_STORAGE_KEYS.IS_MOTION_GUIDE_OPEN
        );

        if (
          isMotionGuideOpen === null ||
          isMotionGuideOpen !== ASYNC_STORAGE_VALUES.IS_MOTION_GUIDE_OPEN.TRUE
        ) {
          router.push('/(modal)/motion');
          await AsyncStorage.setItem(
            ASYNC_STORAGE_KEYS.IS_MOTION_GUIDE_OPEN,
            ASYNC_STORAGE_VALUES.IS_MOTION_GUIDE_OPEN.TRUE
          );
        }
      } catch (e) {
        // eslint-disable-next-line
        console.info(e);
      }
    })();
  }, []);

  return (
    <View>
      <Pressable
        onPress={() => {
          Accelerometer.setUpdateInterval(1000);
        }}
      >
        <Text>Motion</Text>
      </Pressable>
    </View>
  );
}
