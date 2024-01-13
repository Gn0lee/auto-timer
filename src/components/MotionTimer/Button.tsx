import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, useColorScheme, StyleSheet, Alert } from 'react-native';

import { View, Text } from '@components/Themed';
import { useAppSelector } from '@store/redux';
import Colors from '@const/Colors';
import useMotionTimer from '@hooks/useMotionTimer';

const IconSize = 60;

interface ButtonProps {
  granted?: boolean;
  requestGrant: () => Promise<void>;
}

export default function Button({ granted, requestGrant }: ButtonProps) {
  const { start, stop, pause } = useMotionTimer();

  const colorScheme = useColorScheme();

  const { mode } = useAppSelector((state) => state.motion);

  const handleTimerStart = () => {
    if (granted) {
      start();
    } else {
      requestGrant();
    }
  };

  const handleTimerPause = () => {
    pause();
  };

  const handleTimerStop = () => {
    stop();
  };

  if (mode === 'stop') {
    return (
      <View style={styles.container}>
        <Pressable onPressOut={handleTimerStart}>
          <MaterialIcons
            name="play-arrow"
            size={IconSize}
            color={Colors[colorScheme ?? 'light'].text}
          />
        </Pressable>
      </View>
    );
  }

  if (mode === 'running') {
    return (
      <View style={styles.container}>
        <Pressable onPressOut={handleTimerPause}>
          <MaterialIcons name="pause" size={IconSize} color={Colors[colorScheme ?? 'light'].text} />
        </Pressable>
        <Pressable onPressOut={handleTimerStop}>
          <MaterialIcons name="stop" size={IconSize} color={Colors[colorScheme ?? 'light'].text} />
        </Pressable>
      </View>
    );
  }

  if (mode === 'pause-motion') {
    return (
      <View style={styles.textBox}>
        <View style={styles.container}>
          <Pressable onPressOut={handleTimerPause}>
            <MaterialIcons
              name="pause"
              size={IconSize}
              color={Colors[colorScheme ?? 'light'].text}
            />
          </Pressable>
          <Pressable onPressOut={handleTimerStop}>
            <MaterialIcons
              name="stop"
              size={IconSize}
              color={Colors[colorScheme ?? 'light'].text}
            />
          </Pressable>
        </View>
        <Text style={styles.autoStop}>자동 일시 정지</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable onPressOut={handleTimerStart}>
        <MaterialIcons
          name="play-arrow"
          size={IconSize}
          color={Colors[colorScheme ?? 'light'].text}
        />
      </Pressable>
      <Pressable onPressOut={handleTimerStop}>
        <MaterialIcons name="stop" size={IconSize} color={Colors[colorScheme ?? 'light'].text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    flexDirection: 'row',
  },
  textBox: {
    gap: 30,
    alignItems: 'center',
  },
  autoStop: {
    fontSize: 20,
    fontWeight: '500',
  },
});
