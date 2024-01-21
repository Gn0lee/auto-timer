import { StyleSheet, SafeAreaView } from 'react-native';

import { View } from '@components/Themed';

export default function Setting() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <View style={styles.profileBox} />
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
    flexDirection: 'column',
  },
  profileBox: {
    height: 60,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '99%',
  },
});
