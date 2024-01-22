import { useState } from 'react';
import { useColorScheme, StyleSheet } from 'react-native';
import { CheckBox, useTheme, useThemeMode } from '@rneui/themed';
import { useTranslation } from 'react-i18next';

import { View, Text } from '@components/Themed';
import Separator from '@components/Separator';

export default function ColorScheme() {
  const colorScheme = useColorScheme();

  const { t } = useTranslation(['settings']);

  const { setMode } = useThemeMode();

  const { theme } = useTheme();

  const [colorMode, setColorMode] = useState<'auto' | 'dark' | 'light'>(colorScheme ?? 'auto');

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ color: theme?.colors.grey4 }}>테마</Text>
      </View>
      <CheckBox
        checked={colorMode === 'auto'}
        onPress={() => {
          setColorMode('auto');
          setMode(colorScheme ?? 'dark');
        }}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        title={
          <View style={styles.box}>
            <Text style={styles.title}>{t('theme.label_systemSettingMode')}</Text>
            <Text style={styles.description}>{t('theme.description_systemSettingMode')}</Text>
          </View>
        }
        iconRight
        wrapperStyle={styles.wrapper}
        containerStyle={styles.checkboxContainer}
      />
      <CheckBox
        checked={colorMode === 'light'}
        onPress={() => {
          setColorMode('light');
          setMode('light');
        }}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        title={
          <View style={styles.box}>
            <Text style={styles.title}>{t('theme.label_lightMode')}</Text>
          </View>
        }
        iconRight
        wrapperStyle={styles.wrapper}
        containerStyle={styles.checkboxContainer}
      />
      <CheckBox
        checked={colorMode === 'dark'}
        onPress={() => {
          setColorMode('dark');
          setMode('dark');
        }}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        title={
          <View style={styles.box}>
            <Text style={styles.title}>{t('theme.label_darkMode')}</Text>
          </View>
        }
        iconRight
        wrapperStyle={styles.wrapper}
        containerStyle={styles.checkboxContainer}
      />
      <Separator style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 8,
    paddingRight: 16,
    paddingLeft: 16,
  },
  wrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    margin: 0,
    padding: 0,
  },
  checkboxContainer: {
    margin: 0,
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
    paddingTop: 10,
    paddingBottom: 10,
  },
  box: {
    flex: 0.8,
    flexDirection: 'column',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
  },
  separator: {
    width: '100%',
  },
});
