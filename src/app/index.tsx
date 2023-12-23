import { StyleSheet } from 'react-native';

import { View } from '@components/Themed';
import Timer from '@components/Timer/Timer';
import Button from '@components/Timer/Button';

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Timer />
        <Button />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    flex: 0.5,
    alignItems: 'center',
    gap: 20,
  },
});
