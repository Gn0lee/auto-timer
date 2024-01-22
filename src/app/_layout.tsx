import { SplashScreen, Stack } from 'expo-router';

import { Provider } from 'react-redux';
import { ThemeProvider } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import redux from '@store/redux';
import '@i18n/settingI18n';
import useLoadAssets from '@hooks/useLoadAssets';
import useLayoutTheme, { rootTheme } from '@hooks/useLayoutTheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(modal)" options={{ presentation: 'modal', headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  useLayoutTheme();

  const { isReady, handleLayout } = useLoadAssets();

  if (!isReady) {
    return null;
  }

  return (
    <Provider store={redux}>
      <SafeAreaProvider onLayout={handleLayout}>
        <ThemeProvider theme={rootTheme}>
          <RootLayoutNav />
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
