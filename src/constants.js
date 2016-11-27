// const ROOT_DIR = '/daniil-gorbunov/';
const ROOT_DIR = '/fe-mentoring-2016_github/';
const IMAGES_DIR = `${ROOT_DIR}images/`;

module.exports = {
    API_KEY: '6d2df7867b8e4cda9d90ea70b9895d9c',
    NEWS_API_URL: 'https://newsapi.org/v1/',
    NEWS_API_ARTICLES: 'articles',
    NEWS_API_SOURCES: 'sources',
    ROOT_DIR: ROOT_DIR,
    IMAGES_DIR: IMAGES_DIR,
    FLAGS_DIR: `${IMAGES_DIR}flags/`,

    COUNTRIES: {
        au: 'au.png',
        de: 'de.png',
        gb: 'gb.png',
        in: 'in.png',
        it: 'it.png',
        us: 'us.png',
    },

    LANGUAGES: {
        en: 'us.png',
        fr: 'fr.png',
        de: 'de.png',
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

