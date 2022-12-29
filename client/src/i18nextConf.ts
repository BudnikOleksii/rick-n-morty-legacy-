import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ns: ['main', 'user-card'],
    defaultNS: 'main',
    supportedLngs: ['en', 'uk', 'ru'],
    fallbackLng: 'en',
    debug: false,
    detection: {
      order: ['path', 'localStorage', 'cookie', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18next;
