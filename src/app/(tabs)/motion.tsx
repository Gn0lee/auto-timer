import { useEffect } from 'react';

import { View } from '@components/Themed';
import useGetDeviceMotionPermission from '@hooks/useGetDeviceMotionPermission';
import Button from '@components/MotionTimer/Button';
import { SafeAreaView, StyleSheet } from 'react-native';
import Clock from '@components/MotionTimer/Clock';
import useMotionTimerGuideHandler from '@hooks/useMotionTimerGuideHandler';
import { useAppDispatch } from '@store/redux';
import { stop } from '@store/motionTimerSlice';

export default function Motion() {
  const dispatch = useAppDispatch();

  const { requestGrant, granted } = useGetDeviceMotionPermission();

  useMotionTimerGuideHandler();

  useEffect(() => {
    return () => {
      dispatch(stop());
    };
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Clock />
        <Button requestGrant={requestGrant} granted={granted} />
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
