import { getCameraPermissionsAsync, requestCameraPermissionsAsync } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Alert, Linking, AppState, AppStateStatus } from 'react-native';

export default function useGetCameraPermission() {
  const [granted, setGranted] = useState<boolean>();

  useEffect(() => {
    (async () => {
      const { granted: currentGranted } = await getCameraPermissionsAsync();

      if (!currentGranted) {
        const { granted: afterGranted, canAskAgain } = await requestCameraPermissionsAsync();

        setGranted(afterGranted);

        if (!afterGranted && !canAskAgain) {
          Alert.alert(
            '카메라 접근 필요',
            '해당 기능을 사용하기 위해선 카메라 접근 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
            [
              { text: '취소', style: 'cancel' },
              { text: '설정으로 이동', onPress: () => Linking.openSettings() },
            ],
            { cancelable: false }
          );
        }
      } else {
        setGranted(currentGranted);
      }
    })();
  }, []);

  useEffect(() => {
    const handleAppStateChange = async (nextState: AppStateStatus) => {
      if (nextState === 'active') {
        const { granted: afterActiveGranted } = await getCameraPermissionsAsync();

        setGranted(afterActiveGranted);
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  const requestPermission = async () => {
    const { granted: afterGranted, canAskAgain } = await requestCameraPermissionsAsync();

    if (!afterGranted && !canAskAgain) {
      Alert.alert(
        '카메라 접근 필요',
        '해당 기능을 사용하기 위해선 카메라 접근 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
        [
          { text: '취소', style: 'cancel' },
          { text: '설정으로 이동', onPress: () => Linking.openSettings() },
        ],
        { cancelable: false }
      );
    }

    setGranted(afterGranted);
  };

  return { granted, requestPermission };
}
