import { Camera, CameraType } from 'expo-camera';
import { useEffect } from 'react';

export default function useGetCameraPermission() {
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    (async () => {
      requestPermission();
    })();
  }, [requestPermission]);
}
