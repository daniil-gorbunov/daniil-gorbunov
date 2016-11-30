const ROOT_DIR = '/daniil-gorbunov/';
const IMAGES_DIR = `${ROOT_DIR}images/`;

export default {
    API_KEY: '6d2df7867b8e4cda9d90ea70b9895d9c',
    NEWS_API_URL: 'https://newsapi.org/v1/',
    NEWS_API_ARTICLES: 'articles',
    NEWS_API_SOURCES: 'sources',
    ROOT_DIR: ROOT_DIR,
    IMAGES_DIR: IMAGES_DIR,
    FLAGS_DIR: `${IMAGES_DIR}flags/`,

    COUNTRIES: {
        au: 'au',
        de: 'de',
        gb: 'gb',
        in: 'in',
        it: 'it',
        us: 'us',
    },

    LANGUAGES: {
        en: 'us',
        fr: 'fr',
        de: 'de',
    },

    CATEGORIES: {
        'business': 'Business',
        'entertainment': 'Entertainment',
        'gaming': 'Gaming',
        'general': 'General',
        'music': 'Music',
        'science-and-nature': 'Science and Nature',
        'sport': 'Sport',
        'technology': 'Technology',
    },

    GLOBAL_SETTINGS: {
        language: 'en',
        country: 'us',
        category: 'general',
    }
};
