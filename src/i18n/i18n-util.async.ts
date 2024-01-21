import { initFormatters } from '@i18n/formatters';
import type { Locales, Translations } from '@i18n/i18n-types';
import { loadedFormatters, loadedLocales, locales } from '@i18n/i18n-util';

const localeTranslationLoaders = {
  // eslint-disable-next-line global-require
  en: () => require('@i18n/en'),
  // eslint-disable-next-line global-require
  ko: () => require('@i18n/ko'),
};

const updateDictionary = (locale: Locales, dictionary: Partial<Translations>): Translations => {
  const updatedDictionary = { ...loadedLocales[locale], ...dictionary };
  loadedLocales[locale] = updatedDictionary;
  return updatedDictionary;
};

export const importLocaleAsync = async (locale: Locales): Promise<Translations> =>
  (await localeTranslationLoaders[locale]()).default as unknown as Translations;

export const loadLocaleAsync = async (locale: Locales): Promise<void> => {
  updateDictionary(locale, await importLocaleAsync(locale));
  loadFormatters(locale);
};

export const loadAllLocalesAsync = (): Promise<void[]> => Promise.all(locales.map(loadLocaleAsync));

export const loadFormatters = (locale: Locales): void => {
  loadedFormatters[locale] = initFormatters(locale);
};
