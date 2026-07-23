import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en.json';
import arTranslation from './locales/ar.json';

// Retrieve initial language from session storage or default to 'en'
const savedLanguage = sessionStorage.getItem('language') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      ar: {
        translation: arTranslation,
      },
    },
    lng: savedLanguage, // initial language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

// Update the dir attribute on the body tag for RTL support
document.documentElement.dir = i18n.dir();

i18n.on('languageChanged', (lng) => {
  document.documentElement.dir = i18n.dir(lng);
  sessionStorage.setItem('language', lng);
});

export default i18n;
