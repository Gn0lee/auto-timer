import { StyleSheet } from 'react-native';

import { View } from '@components/Themed';
import UserGuide from '@components/BasicTimer/UserGuide';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <UserGuide />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
});
