import { StyleSheet } from 'react-native';

import { Text, View } from '@components/Themed';
import Timer from '@components/Timer/Timer';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Timer />
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