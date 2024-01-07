import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { router } from 'expo-router';

import { View, Text } from '@components/Themed';
import useGetDeviceMotionPermission from '@hooks/useGetDeviceMotionPermission';
import { ASYNC_STORAGE_VALUES, ASYNC_STORAGE_KEYS } from '@const/AsyncStorage';

export default function Motion() {
  useGetDeviceMotionPermission();

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
          await AsyncStorage.setItem(
            ASYNC_STORAGE_KEYS.IS_MOTION_GUIDE_OPEN,
            ASYNC_STORAGE_VALUES.IS_MOTION_GUIDE_OPEN.TRUE
          );
        }
      } catch (e) {
        // eslint-disable-next-line
        console.info(e);
      } finally {
        router.push('/(modal)/motion');
      }
    })();
  }, []);

  return (
    <View>
      <Text>Motion</Text>
    </View>
  );
}
