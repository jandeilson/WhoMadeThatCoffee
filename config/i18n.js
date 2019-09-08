import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import en from '../src/locales/en.json';
import pt from '../src/locales/pt.json';

const options = {
    interpolation: {
        escapeValue: false, // not needed for react!!
    },

    debug: true,
    initImmediate: false,

    resources: {
        'pt-BR': {
            translation: pt['pt-BR'],
        },
        'en': {
            translation: en.en,
        },
    },

    //lng: 'en',
    //fallbackLng: 'en',

    ns: ['translation'],

    defaultNS: 'translation',

    react: {
        wait: false,
        bindI18n: 'languageChanged loaded',
        bindStore: 'added removed',
        nsMode: 'default'
    },

};

i18n
    .use(detector)
    .init(options);

export default i18n;