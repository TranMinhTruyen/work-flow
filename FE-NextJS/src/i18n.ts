import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEn from './locales/en/common.json';
import loginEn from './locales/en/login.json';
import registerEn from './locales/en/register.json';

import commonVn from './locales/vn/common.json';
import loginVn from './locales/vn/login.json';
import registerVn from './locales/vn/register.json';

import commonJp from './locales/jp/common.json';
import loginJp from './locales/jp/login.json';
import registerJp from './locales/jp/register.json';

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
    vn: {
      common: commonVn,
      login: loginVn,
      register: registerVn,
    },
    jp: {
      common: commonJp,
      login: loginJp,
      register: registerJp,
    },
  },
  ns: ['common', 'login', 'register'],
  defaultNS: 'common',
});

export default i18n;
