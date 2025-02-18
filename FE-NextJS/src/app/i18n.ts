import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEn from '../../public/locales/en/common.json';
import loginEn from '../../public/locales/en/login.json';
import registerEn from '../../public/locales/en/register.json';

import commonVi from '../../public/locales/vi/common.json';
import loginVi from '../../public/locales/vi/login.json';
import registerVi from '../../public/locales/vi/register.json';

import commonJa from '../../public/locales/ja/common.json';
import loginJa from '../../public/locales/ja/login.json';
import registerJa from '../../public/locales/ja/register.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  load: 'languageOnly',
  preload: ['en', 'ja', 'vi'],
  initAsync: true,
  react: {
    useSuspense: true,
  },
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
