import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEn from './locales/en/common.json';
import editScreenEn from './locales/en/edit_screen.json';
import loginEn from './locales/en/login.json';
import registerEn from './locales/en/register.json';
import commonVn from './locales/vi/common.json';
import loginVn from './locales/vi/login.json';
import registerVn from './locales/vi/register.json';
import commonJp from './locales/ja/common.json';
import loginJp from './locales/ja/login.json';
import registerJp from './locales/ja/register.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      common: commonEn,
      login: loginEn,
      register: registerEn,
      edit_screen: editScreenEn,
    },
    vi: {
      common: commonVn,
      login: loginVn,
      register: registerVn,
    },
    ja: {
      common: commonJp,
      login: loginJp,
      register: registerJp,
    },
  },
  ns: ['common', 'login', 'register'],
  defaultNS: 'common',
});

export default i18n;
