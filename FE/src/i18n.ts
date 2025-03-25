/* eslint-disable import/order */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

//---English language---
import commonEn from './locales/en/common.json';
import loginEn from './locales/en/login.json';
import registerEn from './locales/en/register.json';
import addNewScreenEn from './locales/en/screen/addNewScreen.json';
import editScreenEn from './locales/en/screen/editScreen.json';
import screenEn from './locales/en/screen/screen.json';

//---Japanese language---
import commonJp from './locales/ja/common.json';
import loginJp from './locales/ja/login.json';
import registerJp from './locales/ja/register.json';
import addNewScreenJp from './locales/ja/screen/addNewScreen.json';
import editScreenJp from './locales/ja/screen/editScreen.json';
import screenJp from './locales/ja/screen/screen.json';

//---Vietnamese language---
import commonVn from './locales/vi/common.json';
import loginVn from './locales/vi/login.json';
import registerVn from './locales/vi/register.json';
import addNewScreenVn from './locales/vi/screen/addNewScreen.json';
import editScreenVn from './locales/vi/screen/editScreen.json';
import screenVn from './locales/vi/screen/screen.json';

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
      addNewScreen: addNewScreenEn,
      editScreen: editScreenEn,
    },
    vi: {
      common: commonVn,
      login: loginVn,
      register: registerVn,
      screen: screenVn,
      addNewScreen: addNewScreenVn,
      editScreen: editScreenVn,
    },
    ja: {
      common: commonJp,
      login: loginJp,
      register: registerJp,
      screen: screenJp,
      addNewScreen: addNewScreenJp,
      editScreen: editScreenJp,
    },
  },
  ns: ['common', 'login', 'register'],
  defaultNS: 'common',
});

export default i18n;
