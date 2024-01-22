import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

import { ASYNC_STORAGE_KEYS, ASYNC_STORAGE_VALUES } from '@const/AsyncStorage';

export default function useGetColorMode() {
  const [colorMode, setColorMode] = useState<'auto' | 'dark' | 'light'>('auto');

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const selectedTheme = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.THEME);

        if (selectedTheme === null) {
          setColorMode('auto');

          return;
        }

        if (selectedTheme === ASYNC_STORAGE_VALUES.THEME.DARK) {
          setColorMode('dark');
          return;
        }

        setColorMode('light');
      } catch (e) {
        setColorMode('auto');
      } finally {
        setIsReady(true);
      }
    })();
  }, []);

  return { colorMode, setColorMode, isReady };
}
