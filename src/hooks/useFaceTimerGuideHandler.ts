import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ASYNC_STORAGE_KEYS, ASYNC_STORAGE_VALUES } from '@const/AsyncStorage';
import { router } from 'expo-router';

export default function useFaceTimerGuideHandler() {
  useEffect(() => {
    (async () => {
      try {
        const isFaceGuideOpen = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.IS_FACE_GUIDE_OPEN);

        if (
          isFaceGuideOpen === null ||
          isFaceGuideOpen !== ASYNC_STORAGE_VALUES.IS_MOTION_GUIDE_OPEN.TRUE
        ) {
          router.push('/(modal)/face');
          await AsyncStorage.setItem(
            ASYNC_STORAGE_KEYS.IS_FACE_GUIDE_OPEN,
            ASYNC_STORAGE_VALUES.IS_FACE_GUIDE_OPEN.TRUE
          );
        }
      } catch (e) {
        // eslint-disable-next-line
        console.info(e);
      }
    })();
  }, []);
}
