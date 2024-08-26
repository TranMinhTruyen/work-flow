import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import viTranslation from './locales/vn.translation.json';

i18n.use(initReactI18next).init({
  resources: {
    VI: {
      translation: viTranslation,
    },
  },
  lng: 'EN',
  fallbackLng: 'EN',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
