import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ['en', 'es', 'fr', 'pt', 'it', 'ru', 'sr'],
        fallbackLng: 'en',
        debug: true,
        detection: {
            order: ['path'],
            lookupFromPathIndex: 0,
        },
        backend: {
            loadPath: '/i18n/{{lng}}.json',
        },
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
    });

export default i18n;
