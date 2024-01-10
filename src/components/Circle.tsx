import { StyleSheet } from 'react-native';

import { View } from '@components/Themed';

export default function Circle() {
  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <View style={styles.circle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    gap: 8,
    width: 8,
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F1F5F9',
  },
});
