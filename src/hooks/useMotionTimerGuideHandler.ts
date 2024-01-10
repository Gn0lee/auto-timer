import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ASYNC_STORAGE_KEYS, ASYNC_STORAGE_VALUES } from '@const/AsyncStorage';
import { router } from 'expo-router';

export default function useMotionTimerGuideHandler() {
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
}
