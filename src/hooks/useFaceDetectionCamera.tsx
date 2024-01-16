import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Camera, CameraType, FaceDetectionResult } from 'expo-camera';
import {
  FaceDetectorMode,
  FaceDetectorLandmarks,
  FaceDetectorClassifications,
} from 'expo-face-detector';

import { pauseByFace, setFaceDetectionTimeout, start } from '@store/faceTimerSlice';
import { useAppSelector, useAppDispatch } from '@store/redux';

const CAMERA_SIZE = { height: 480, width: 320 };

export default function useFaceDetectionCamera() {
  const dispatch = useAppDispatch();

  const { mode, faceDetectionTimeout } = useAppSelector((state) => state.face);

  const handleFacesDetected = ({ faces }: FaceDetectionResult) => {
    if (faces.length < 1) {
      dispatch(pauseByFace());
    } else {
      clearTimeout(faceDetectionTimeout);

      dispatch(start());

      dispatch(
        setFaceDetectionTimeout(
          setTimeout(() => {
            dispatch(pauseByFace());
          }, 1000)
        )
      );
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(faceDetectionTimeout);
    };
  }, [faceDetectionTimeout]);

  return {
    TensorCamera:
      mode === 'running' || mode === 'pause-face' ? (
        <Camera
          style={styles.camera}
          type={CameraType.front}
          faceDetectorSettings={{
            mode: FaceDetectorMode.fast,
            detectLandmarks: FaceDetectorLandmarks.none,
            runClassifications: FaceDetectorClassifications.none,
            minDetectionInterval: 800,
            tracking: false,
          }}
          onFacesDetected={handleFacesDetected}
        />
      ) : null,
  };
}

const styles = StyleSheet.create({
  camera: {
    position: 'absolute',
    width: CAMERA_SIZE.width,
    height: CAMERA_SIZE.height,
    top: -100000,
  },
});
