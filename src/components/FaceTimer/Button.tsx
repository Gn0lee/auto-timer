import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';

import { View, Text } from '@components/Themed';
import { useAppSelector } from '@store/redux';
import useFaceTimer from '@hooks/useFaceTimer';

const IconSize = 60;

interface ButtonProps {
  granted?: boolean;
  requestGrant: () => Promise<void>;
}

export default function Button({ granted, requestGrant }: ButtonProps) {
  const { start, stop, pause } = useFaceTimer();

  const { t } = useTranslation(['face']);

  const { theme } = useTheme();

  const { mode } = useAppSelector((state) => state.face);

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

  if (mode === 'pause-face') {
    return (
      <View style={styles.textBox}>
        <View style={styles.container}>
          <Pressable onPressOut={handleTimerPause}>
            <MaterialIcons name="pause" size={IconSize} color={theme.colors.black} />
          </Pressable>
          <Pressable onPressOut={handleTimerStop}>
            <MaterialIcons name="stop" size={IconSize} color={theme.colors.black} />
          </Pressable>
        </View>
        <Text style={styles.autoStop}>{t('button.description_autoPause')}</Text>
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
  textBox: {
    gap: 30,
    alignItems: 'center',
  },
  autoStop: {
    fontSize: 20,
    fontWeight: '500',
  },
});
