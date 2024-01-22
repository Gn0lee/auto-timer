import { Appearance, useColorScheme } from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createTheme } from '@rneui/themed';

import { ASYNC_STORAGE_KEYS, ASYNC_STORAGE_VALUES } from '@const/AsyncStorage';

export default function useLayoutTheme() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    (async () => {
      try {
        const selectedTheme = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.THEME);

        if (selectedTheme === null) {
          rootTheme.mode = colorScheme ?? 'dark';

          return;
        }

        if (selectedTheme === ASYNC_STORAGE_VALUES.THEME.DARK) {
          rootTheme.mode = 'dark';
          return;
        }

        rootTheme.mode = 'light';
      } catch (e) {
        rootTheme.mode = 'dark';
      }
    })();
  }, [colorScheme]);
}

export const rootTheme = createTheme({});
