import { SafeAreaView, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

import { View } from '@components/Themed';
import Clock from '@components/BasicTimer/Clock';
import Button from '@components/BasicTimer/Button';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.BANNER} />
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
