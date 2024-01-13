import { Stack } from 'expo-router';

export default function ModalLayout() {
  return (
    <Stack>
      <Stack.Screen name="basic" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="motion" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="face" options={{ presentation: 'modal', headerShown: false }} />
    </Stack>
  );
}
