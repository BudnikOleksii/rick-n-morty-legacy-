import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { NAME_SPACES } from './constants';

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ns: [NAME_SPACES.main, NAME_SPACES.userCard, NAME_SPACES.pages],
    defaultNS: NAME_SPACES.main,
    supportedLngs: ['en', 'uk', 'ru'],
    fallbackLng: 'en',
    debug: false,
    detection: {
      order: ['path', 'cookie', 'htmlTag'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18next;
