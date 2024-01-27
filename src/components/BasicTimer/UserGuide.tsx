import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@components/Themed';
import { useTranslation } from 'react-i18next';

export default function UserGuide() {
  const { t } = useTranslation(['basic']);

  return (
    <View style={styles.getStartedContainer}>
      <Text style={styles.getStartedText}>{t('modal.description_timerBasic')}</Text>
      <Text style={styles.getStartedText}>{t('modal.description_playFunction')}</Text>
      <Text style={styles.getStartedText}>{t('modal.description_pauseFunction')}</Text>
      <Text style={styles.getStartedText}>{t('modal.description_stopInPause')}</Text>
      <Text style={styles.getStartedText}>{t('modal.description_resumeAfterPause')}</Text>
      <Text style={styles.getStartedText}>{t('modal.description_noRecordOnExit')}</Text>
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
