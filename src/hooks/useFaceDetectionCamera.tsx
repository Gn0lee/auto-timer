import { useEffect, useState, createRef } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import * as tf from '@tensorflow/tfjs';
import * as blazeFace from '@tensorflow-models/blazeface';
import '@tensorflow/tfjs-backend-webgl';

import { pauseByFace } from '@store/faceTimerSlice';
import { useAppSelector, useAppDispatch } from '@store/redux';

const textureDims =
  Platform.OS === 'ios' ? { height: 1920, width: 1080 } : { height: 1200, width: 1600 };

const CAMERA_SIZE = { height: 480, width: 320 };

const TensorCamera = cameraWithTensors(Camera);

export default function useFaceDetectionCamera() {
  const dispatch = useAppDispatch();

  const { mode } = useAppSelector((state) => state.face);

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
    const loop = async () => {
      const { done, value: nextImageTensor } = images.next();

      if (!done) {
        const blaze = await blazeFace.load();

        const predictions = await blaze.estimateFaces(nextImageTensor, false);

        console.log(predictions);
      }

      // todo: 렌더링 해제 및 타이머 멈춤시 타임아웃 clear

      setTimeout(() => {
        requestAnimationFrame(loop);
      }, 2000);
    };

    loop();
  };

  return {
    TensorCamera:
      isTensorFlowReady && mode === 'running' ? (
        <TensorCamera
          ref={tensorCameraRef}
          style={styles.camera}
          type={CameraType.front}
          cameraTextureHeight={textureDims.height}
          cameraTextureWidth={textureDims.width}
          resizeHeight={CAMERA_SIZE.height}
          resizeWidth={CAMERA_SIZE.width}
          resizeDepth={3}
          autorender
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
