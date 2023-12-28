import { StyleSheet, SafeAreaView } from 'react-native';

import { View } from '@components/Themed';
import Clock from '@components/Timer/Clock';
import Button from '@components/Timer/Button';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Clock />
        <Button />
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
