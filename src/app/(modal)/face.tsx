import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { Text, View } from '@components/Themed';
import UserGuide from '@components/FaceTimer/UserGuide';
import Separator from '@components/Separator';

export default function FaceGuideModal() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>얼굴 감지 모드</Text>
      <Separator />
      <UserGuide />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
