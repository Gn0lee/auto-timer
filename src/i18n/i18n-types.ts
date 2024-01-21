import type { BaseTranslation as BaseTranslationType, LocalizedString } from 'typesafe-i18n';

export type BaseTranslation = BaseTranslationType;
export type BaseLocale = 'en';

export type Locales = 'en' | 'ko';

type RootTranslation = {
  BASIC: {
    TAB: {
      TITLE: string;
    };
  };
};

export type TranslationFunctions = {
  BASIC: {
    TAB: {
      TITLE: () => LocalizedString;
    };
  };
};

export type Formatters = {
  weekday: (value: Date) => unknown;
};

export type Translation = RootTranslation;

export type Translations = RootTranslation;
