import { View } from '@components/Themed';
import useGetDeviceMotionPermission from '@hooks/useGetDeviceMotionPermission';

import Button from '@components/MotionTimer/Button';
import { SafeAreaView, StyleSheet } from 'react-native';
import Clock from '@components/MotionTimer/Clock';
import useMotionTimerGuideHandler from '@hooks/useMotionTimerGuideHandler';

export default function Motion() {
  useGetDeviceMotionPermission();

  useMotionTimerGuideHandler();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Clock />
        <Button />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    padding: 15,
  },
});
