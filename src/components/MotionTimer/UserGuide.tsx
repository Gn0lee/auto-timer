import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Text, View } from '@components/Themed';
import { useTranslation } from 'react-i18next';

export default function UserGuide() {
  const { t } = useTranslation(['motion']);

  // 플랫폼에 따른 배터리 잔량 텍스트 설정
  const platformBatteryLevel =
    Platform.OS === 'ios'
      ? t('modal.description_batteryLowIOS')
      : t('modal.description_batteryLowAndroid');

  return (
    <View style={styles.getStartedContainer}>
      <Text style={styles.getStartedText}>{t('modal.description_detectMotion')}</Text>
      <Text style={styles.getStartedText}>{t('modal.description_enableMotion')}</Text>
      <Text style={styles.getStartedText}>{t('modal.description_noLockMode')}</Text>
      <Text style={styles.getStartedText}>
        {t('modal.description_autoStop', { platformBatteryLevel })}
      </Text>
      <Text style={styles.getStartedText}>{t('modal.description_recommendCharging')}</Text>
      <Text style={styles.getStartedText}>{t('modal.description_flipToStart')}</Text>
      <Text style={styles.getStartedText}>{t('modal.description_flipToPause')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    gap: 20,
  },

  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
  },
});
