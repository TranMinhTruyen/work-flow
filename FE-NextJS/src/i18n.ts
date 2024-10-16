import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEn from '../public/locales/en/common.json';
import loginEn from '../public/locales/en/login.json';
import registerEn from '../public/locales/en/register.json';

import commonVn from '../public/locales/vn/common.json';
import loginVn from '../public/locales/vn/login.json';
import registerVn from '../public/locales/vn/register.json';

import commonJp from '../public/locales/jp/common.json';
import loginJp from '../public/locales/jp/login.json';
import registerJp from '../public/locales/jp/register.json';

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
