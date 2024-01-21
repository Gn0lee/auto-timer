import AsyncStorage from '@react-native-async-storage/async-storage';

import { Locales } from '@i18n/i18n-types';
import { isLocale } from '@i18n/i18n-util';

const LOCALE_KEY = '@user-locale';

export const getUserLocale = async (defaultLocale: Locales) => {
  try {
    const value = await AsyncStorage.getItem(LOCALE_KEY);
    if (value !== null && isLocale(value)) {
      return value;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error reading from local storage', e);
  }

  return defaultLocale;
};

export const setUserLocale = async (value: Locales) => {
  try {
    await AsyncStorage.setItem(LOCALE_KEY, value);
    return value;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error reading from local storage', e);
    throw e;
  }
};
