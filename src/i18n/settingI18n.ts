import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { getLocales } from 'expo-localization';

import commonEn from '@i18n/en/common.json';
import commonKo from '@i18n/ko/common.json';

const resources = {
  en: {
    common: commonEn,
  },
  ko: {
    common: commonKo,
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
  defaultNS: 'common',
});

export default i18n;
