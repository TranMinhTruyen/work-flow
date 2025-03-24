/* eslint-disable import/order */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

//---English language---
import commonEn from './locales/en/common.json';
import editScreenEn from './locales/en/editScreen.json';
import loginEn from './locales/en/login.json';
import registerEn from './locales/en/register.json';
import screenEn from './locales/en/screen.json';

//---Japanese language---
import commonJp from './locales/ja/common.json';
import editScreenJp from './locales/ja/editScreen.json';
import loginJp from './locales/ja/login.json';
import registerJp from './locales/ja/register.json';
import screenJp from './locales/ja/screen.json';

//---Vietnamese language---
import commonVn from './locales/vi/common.json';
import editScreenVn from './locales/vi/editScreen.json';
import loginVn from './locales/vi/login.json';
import registerVn from './locales/vi/register.json';
import screenVn from './locales/vi/screen.json';

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
      screen: screenEn,
      editScreen: editScreenEn,
    },
    vi: {
      common: commonVn,
      login: loginVn,
      register: registerVn,
      screen: screenVn,
      editScreen: editScreenVn,
    },
    ja: {
      common: commonJp,
      login: loginJp,
      register: registerJp,
      screen: screenJp,
      editScreen: editScreenJp,
    },
  },
  ns: ['common', 'login', 'register'],
  defaultNS: 'common',
});

export default i18n;
