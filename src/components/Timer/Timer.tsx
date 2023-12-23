import { useEffect } from 'react';

import { Text, View } from '@components/Themed';
import { useAppSelector } from '@store/redux';
import useTimer from '@hooks/useTimer';

function convertMsToTimerFormat(ms: number): string {
  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  seconds %= 60;
  minutes %= 60;

  const hoursStr = hours.toString().padStart(2, '0');
  const minutesStr = minutes.toString().padStart(2, '0');
  const secondsStr = seconds.toString().padStart(2, '0');

  return `${hoursStr}:${minutesStr}:${secondsStr}`;
}
export default function Timer() {
  const { time } = useAppSelector((state) => state.timer);

  return (
    <View>
      <Text>{convertMsToTimerFormat(time)}</Text>
    </View>
  );
}
