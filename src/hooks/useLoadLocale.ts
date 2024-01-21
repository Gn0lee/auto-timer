import * as Localization from 'expo-localization';
import { useEffect, useState } from 'react';

import { Locales } from '@i18n/i18n-types';
import { isLocale } from '@i18n/i18n-util';
import { loadLocaleAsync } from '@i18n/i18n-util.async';
import { getUserLocale } from '@i18n/locale-storage';

const DEFAULT_LOCALE =
  Localization.getLocales()
    .map((it) => it.languageTag)
    .find(isLocale) ?? 'en';

export default function useLoadLocale() {
  const [loadedLocale, setLoadedLocale] = useState<Locales | null>(null);

  useEffect(() => {
    getUserLocale(DEFAULT_LOCALE)
      .then(async (locale) => {
        await loadLocaleAsync(locale);
        return locale;
      })
      .then(setLoadedLocale);
  }, []);

  return loadedLocale;
}
