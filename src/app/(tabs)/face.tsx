import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import { createRef } from 'react';
import { Camera, CameraType } from 'expo-camera';
import * as tf from '@tensorflow/tfjs';

import { View, Text } from '@components/Themed';
import useFaceTimerGuideHandler from '@hooks/useFaceTimerGuideHandler';
import useGetCameraPermission from '@hooks/useGetCameraPermission';
import Button from '@components/FaceTimer/Button';
import useFaceDetectionCamera from '@hooks/useFaceDetectionCamera';

const CAMERA_SIZE = { height: 480, width: 320 };

const textureDims =
  Platform.OS === 'ios' ? { height: 1920, width: 1080 } : { height: 1200, width: 1600 };

export default function Motion() {
  useFaceTimerGuideHandler();

  const { requestPermission, granted } = useGetCameraPermission();

  const { TensorCamera } = useFaceDetectionCamera();

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
  camera: {
    position: 'absolute',
    width: CAMERA_SIZE.width,
    height: CAMERA_SIZE.height,
  },
});
