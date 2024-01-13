import { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

import { View, Text } from '@components/Themed';

import useFaceTimerGuideHandler from '@hooks/useFaceTimerGuideHandler';

export default function Motion() {
  useFaceTimerGuideHandler();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Text>Face</Text>
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
