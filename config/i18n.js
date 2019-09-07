import i18n from 'i18next';

import en from '../src/locales/en.json';
import pt from '../src/locales/pt.json';


const options = {
    fallbackLng: 'en',
    debug: true,
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ',',
    },

    resources: {
        pt,
        en,
    },

    react: {
        wait: true,
    },
};

i18n
    .init(options);


export default i18n;