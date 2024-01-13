import { DeviceMotion } from 'expo-sensors';
import { useEffect, useState } from 'react';

export default function useGetDeviceMotionPermission() {
  const [granted, setGranted] = useState<boolean>();

  useEffect(() => {
    (async () => {
      const { granted: currentGranted } = await DeviceMotion.getPermissionsAsync();

      if (!currentGranted) {
        const { granted: afterRequestGranted } = await DeviceMotion.requestPermissionsAsync();
        setGranted(afterRequestGranted);
      } else {
        setGranted(currentGranted);
      }
    })();
  }, []);

  const requestGrant = async () => {
    const { granted: afterRequestGranted } = await DeviceMotion.requestPermissionsAsync();
    setGranted(afterRequestGranted);
  };

  return { granted, requestGrant };
}
