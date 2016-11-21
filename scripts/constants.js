'use strict';

var API_KEY = '6d2df7867b8e4cda9d90ea70b9895d9c';
var NEWS_API_URL = 'https://newsapi.org/v1/';
var NEWS_API_ARTICLES = 'articles';
var MEWS_API_SOURCES = 'sources';
var ROOT_DIR = '/daniil-gorbunov/';
var IMAGES_DIR = ROOT_DIR + 'images/';
var FLAGS_DIR = IMAGES_DIR + 'flags/';

var COUNTRIES = {
    au: 'au.png',
    de: 'de.png',
    gb: 'gb.png',
    in: 'in.png',
    it: 'it.png',
    us: 'us.png'
};

var LANGUAGES = {
    en: 'us.png',
    fr: 'fr.png',
    de: 'de.png'
};

var CATEGORIES = {
    'business': 'Business',
    'entertainment': 'Entertainment',
    'gaming': 'Gaming',
    'general': 'General',
    'music': 'Music',
    'science-and-nature': 'Science and Nature',
    'sport': 'Sport',
    'technology': 'Technology'
};

var GLOBAL_SETTINGS = {
    language: 'en',
    country: 'us',
    category: 'general'
};