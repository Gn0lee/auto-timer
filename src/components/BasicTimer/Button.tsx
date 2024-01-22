import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@rneui/themed';

import useBasicTimer from '@hooks/useBasicTimer';
import { View } from '@components/Themed';
import { useAppDispatch, useAppSelector } from '@store/redux';
import { setTimerMode } from '@store/basicTimerSlice';
import { useEffect } from 'react';

const IconSize = 60;

export default function Button() {
  const dispatch = useAppDispatch();

  const { start, stop, pause } = useBasicTimer();

  const { theme } = useTheme();

  const { mode } = useAppSelector((state) => state.timer);

  const handleTimerStart = () => {
    start();
    dispatch(setTimerMode('running'));
  };

  const handleTimerPause = () => {
    pause();
    dispatch(setTimerMode('pause'));
  };

  const handleTimerStop = () => {
    stop();
    dispatch(setTimerMode('stop'));
  };

  useEffect(() => {
    return () => {
      stop();
      dispatch(setTimerMode('stop'));
    };
  }, [dispatch, stop]);

  if (mode === 'stop') {
    return (
      <View style={styles.container}>
        <Pressable onPressOut={handleTimerStart}>
          <MaterialIcons name="play-arrow" size={IconSize} color={theme.colors.black} />
        </Pressable>
      </View>
    );
  }

  if (mode === 'running') {
    return (
      <View style={styles.container}>
        <Pressable onPressOut={handleTimerPause}>
          <MaterialIcons name="pause" size={IconSize} color={theme.colors.black} />
        </Pressable>
        <Pressable onPressOut={handleTimerStop}>
          <MaterialIcons name="stop" size={IconSize} color={theme.colors.black} />
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable onPressOut={handleTimerStart}>
        <MaterialIcons name="play-arrow" size={IconSize} color={theme.colors.black} />
      </Pressable>
      <Pressable onPressOut={handleTimerStop}>
        <MaterialIcons name="stop" size={IconSize} color={theme.colors.black} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    flexDirection: 'row',
  },
});
