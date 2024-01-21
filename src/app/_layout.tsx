import { SplashScreen, Stack } from 'expo-router';

import { useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import redux from '@store/redux';
import '@i18n/settingI18n';
import useLoadAssets from '@hooks/useLoadAssets';

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
  const colorScheme = useColorScheme();

  theme.mode = colorScheme ?? 'dark';

  const { isReady, handleLayout } = useLoadAssets();

  if (!isReady) {
    return null;
  }

  return (
    <Provider store={redux}>
      <SafeAreaProvider onLayout={handleLayout}>
        <ThemeProvider theme={theme}>
          <RootLayoutNav />
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

const theme = createTheme({
  lightColors: {
    primary: '#3d5afe',
  },
  darkColors: {
    primary: '#3d5afe',
  },
  mode: 'dark',
  components: {
    Text: {
      h1Style: {
        fontSize: 80,
      },
    },
  },
});
