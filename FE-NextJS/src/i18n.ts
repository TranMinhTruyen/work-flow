import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEn from './locales/en/common.json';
import loginEn from './locales/en/login.json';
import registerEn from './locales/en/register.json';

import commonVi from './locales/vi/common.json';
import loginVi from './locales/vi/login.json';
import registerVi from './locales/vi/register.json';

import commonJa from './locales/ja/common.json';
import loginJa from './locales/ja/login.json';
import registerJa from './locales/ja/register.json';

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      common: commonEn,
      login: loginEn,
      register: registerEn,
    },
    vi: {
      common: commonVi,
      login: loginVi,
      register: registerVi,
    },
    ja: {
      common: commonJa,
      login: loginJa,
      register: registerJa,
    },
  },
  ns: ['common', 'login', 'register'],
  defaultNS: 'common',
});

export default i18n;
