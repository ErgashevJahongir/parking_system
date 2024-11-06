import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationUz from '../../../public/locales/uz/translation.json'
import translationKr from '../../../public/locales/kr/translation.json'
import translationRu from '../../../public/locales/ru/translation.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      uz: {translation: translationUz},
      kr: {translation: translationKr},
      ru: {translation: translationRu}
    },
    fallbackLng: "uz",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
