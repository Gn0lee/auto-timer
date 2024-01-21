import { initFormatters } from '@i18n/formatters';
import type { Locales, Translations } from '@i18n/i18n-types';
import { loadedFormatters, loadedLocales, locales } from '@i18n/i18n-util';

import en from '@i18n/en';
import ko from '@i18n/ko';

const localeTranslations = {
  en,
  ko,
};

export const loadLocale = (locale: Locales): void => {
  if (loadedLocales[locale]) return;

  loadedLocales[locale] = localeTranslations[locale] as unknown as Translations;
  loadFormatters(locale);
};

export const loadAllLocales = (): void => locales.forEach(loadLocale);

export const loadFormatters = (locale: Locales): void => {
  loadedFormatters[locale] = initFormatters(locale);
};
