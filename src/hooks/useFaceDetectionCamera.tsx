import { useEffect, useState, createRef } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import * as tf from '@tensorflow/tfjs';
import * as blazeFace from '@tensorflow-models/blazeface';
import '@tensorflow/tfjs-backend-webgl';

import {
  addRequestAnimationFrame,
  pauseByFace,
  setFaceDetectionTimeout,
  start,
} from '@store/faceTimerSlice';
import { useAppSelector, useAppDispatch } from '@store/redux';

const textureDims =
  Platform.OS === 'ios' ? { height: 1920, width: 1080 } : { height: 1200, width: 1600 };

const CAMERA_SIZE = { height: 480, width: 320 };

const TensorCamera = cameraWithTensors(Camera);

export default function useFaceDetectionCamera() {
  const dispatch = useAppDispatch();

  const { mode, faceDetectionTimeout } = useAppSelector((state) => state.face);

  // ref 타입 지정
  const tensorCameraRef = createRef<any>();

  const [isTensorFlowReady, setIsTensorFlowReady] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      await tf.ready();
      setIsTensorFlowReady(true);
    })();
  }, []);

  const handleTensorflowReady = async (images: IterableIterator<tf.Tensor3D>) => {
    let index = 0;
    const loop = async () => {
      const { done, value: nextImageTensor } = images.next();

      if (!done) {
        const blaze = await blazeFace.load();

        const predictions = await blaze.estimateFaces(nextImageTensor, false);

        if (predictions.length < 1 && index > 0) {
          dispatch(pauseByFace());
        } else {
          dispatch(start());
        }
      }

      dispatch(
        setFaceDetectionTimeout(
          setTimeout(() => {
            const a = requestAnimationFrame(loop);

            dispatch(addRequestAnimationFrame(a));
          }, 2000)
        )
      );

      index += 1;
    };

    loop();
  };

  useEffect(() => {
    return () => {
      clearTimeout(faceDetectionTimeout);
    };
  }, [faceDetectionTimeout]);

  return {
    TensorCamera:
      isTensorFlowReady && (mode === 'running' || mode === 'pause-face') ? (
        <TensorCamera
          ref={tensorCameraRef}
          style={styles.camera}
          type={CameraType.front}
          cameraTextureHeight={textureDims.height}
          cameraTextureWidth={textureDims.width}
          resizeHeight={CAMERA_SIZE.height}
          resizeWidth={CAMERA_SIZE.width}
          resizeDepth={3}
          autorender={false}
          useCustomShadersToResize={false}
          onReady={handleTensorflowReady}
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
