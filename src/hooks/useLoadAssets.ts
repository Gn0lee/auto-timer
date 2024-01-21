import { useState, useEffect, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import { fontAssets, cacheFonts } from '@utils/assets';

export default function useLoadAssets() {
  const [isReady, setIsReady] = useState(false);

  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async () => {
      try {
        await Promise.all([...cacheFonts(fontAssets)]);

        setIsReady(true);
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  const handleLayout = useCallback(async () => {
    if (isReady) {
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        }
      }
    }
  }, [isReady]);

  return { isReady, handleLayout, error };
}
