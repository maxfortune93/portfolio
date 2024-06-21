import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt',
    debug: true,
    interpolation: {
      escapeValue: false, 
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
        order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
  
        lookupQuerystring: 'lng',
        lookupCookie: 'i18next',
        lookupLocalStorage: 'i18nextLng',
        lookupSessionStorage: 'i18nextLng',
        lookupFromPathIndex: 0,
        lookupFromSubdomainIndex: 0,
  
        // cache user language on
        // caches: ['localStorage', 'cookie'],
        // excludeCacheFor: ['cimode'], 
  
        // optional expire and domain for set cookie
        cookieMinutes: 10,
        cookieDomain: 'myDomain',
  
        // optional htmlTag with lang attribute, the default is:
        htmlTag: document.documentElement,
  
        // only detect languages that are in the whitelist
        checkWhitelist: true
      }
  });

export default i18n;
