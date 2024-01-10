import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { Text, View } from '@components/Themed';
import UserGuide from '@components/MotionTimer/UserGuide';

export default function MotionGuideModal() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>움직임 감지 모드</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
