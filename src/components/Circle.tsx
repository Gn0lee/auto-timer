import { StyleSheet } from 'react-native';
import { useTheme } from '@rneui/themed';

import { View } from '@components/Themed';

export default function Circle() {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.circle, { backgroundColor: theme?.colors.black }]} />
      <View style={[styles.circle, { backgroundColor: theme?.colors.black }]} />
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
  },
});
