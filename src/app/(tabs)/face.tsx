import { SafeAreaView, StyleSheet } from 'react-native';

import { View, Text } from '@components/Themed';
import useFaceTimerGuideHandler from '@hooks/useFaceTimerGuideHandler';
import useGetCameraPermission from '@hooks/useGetCameraPermission';
import Button from '@components/FaceTimer/Button';

export default function Motion() {
  useFaceTimerGuideHandler();

  const { requestPermission, granted } = useGetCameraPermission();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Text>Face</Text>
        <Button requestGrant={requestPermission} granted={granted} />
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
