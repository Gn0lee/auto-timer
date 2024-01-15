import { SafeAreaView, StyleSheet } from 'react-native';
import { useEffect } from 'react';

import { View, Text } from '@components/Themed';
import useFaceTimerGuideHandler from '@hooks/useFaceTimerGuideHandler';
import useGetCameraPermission from '@hooks/useGetCameraPermission';
import Button from '@components/FaceTimer/Button';
import useFaceDetectionCamera from '@hooks/useFaceDetectionCamera';
import { useAppDispatch } from '@store/redux';
import { stop } from '@store/faceTimerSlice';

export default function Motion() {
  const dispatch = useAppDispatch();

  useFaceTimerGuideHandler();

  const { requestPermission, granted } = useGetCameraPermission();

  const { TensorCamera } = useFaceDetectionCamera();

  useEffect(() => {
    return () => {
      dispatch(stop());
    };
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Text>Face</Text>
        <Button requestGrant={requestPermission} granted={granted} />
        {TensorCamera}
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
