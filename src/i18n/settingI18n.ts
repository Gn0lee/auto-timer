import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { getLocales } from 'expo-localization';

import basicEn from '@i18n/en/basic.json';
import basicKo from '@i18n/ko/basic.json';

const resources = {
  en: {
    basic: basicEn,
  },
  ko: {
    basic: basicKo,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: getLocales()[0].languageCode,
  fallbackLng: 'en',
  supportedLngs: ['en', 'ko'],
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
