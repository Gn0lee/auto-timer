import { useCallback } from 'react';

import { useI18nContext } from '@i18n/i18n-react';
import { Locales } from '@i18n/i18n-types';
import { setUserLocale } from '@i18n/locale-storage';
import { loadLocaleAsync } from '@i18n/i18n-util.async';

export default function useLocaleChange() {
  const { setLocale } = useI18nContext();

  return useCallback(
    (locale: Locales) => {
      setUserLocale(locale)
        .then(async (storedLocale) => {
          await loadLocaleAsync(storedLocale);
          return storedLocale;
        })
        .then(setLocale);
    },
    [setLocale]
  );
}
