import { StyleSheet } from 'react-native';
import { useAppSelector, RootState } from '@store/redux';
import { createSelector } from '@reduxjs/toolkit';

import { Text, View } from '@components/Themed';
import Circle from '@components/Circle';
import { convertTimeToHMS } from '@utils/time';

export default function Clock() {
  const { hours, seconds, minutes } = useAppSelector(
    createSelector([(state: RootState) => state.motion.time], convertTimeToHMS)
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.number}>{hours.toString().padStart(2, '0')}</Text>
      </View>
      <Circle />
      <View>
        <Text style={styles.number}>{minutes.toString().padStart(2, '0')}</Text>
      </View>
      <Circle />
      <View>
        <Text style={styles.number}>{seconds.toString().padStart(2, '0')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    columnGap: 10,
  },
  number: {
    fontSize: 44,
    fontWeight: '500',
    width: 66,
    textAlign: 'center',
  },
});
