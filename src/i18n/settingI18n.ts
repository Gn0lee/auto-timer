import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { getLocales } from 'expo-localization';

import commonEn from '@i18n/en/common.json';
import commonKo from '@i18n/ko/common.json';

import settingsEn from '@i18n/en/settings.json';
import settingsKo from '@i18n/ko/settings.json';

import basicEn from '@i18n/en/basic.json';
import basicKo from '@i18n/ko/basic.json';

import motionEn from '@i18n/en/motion.json';
import motionKo from '@i18n/ko/motion.json';

import faceEn from '@i18n/en/face.json';
import faceKo from '@i18n/ko/face.json';

const resources = {
  en: {
    common: commonEn,
    settings: settingsEn,
    basic: basicEn,
    motion: motionEn,
    face: faceEn,
  },
  ko: {
    common: commonKo,
    settings: settingsKo,
    basic: basicKo,
    motion: motionKo,
    face: faceKo,
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
