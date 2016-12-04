'use strict';

import settingsService from 'services/settings';
import categoriesService from 'services/categories';
import countriesService from 'services/countries';
import languagesService from 'services/languages'
import Source from 'models/source';
import Article from 'models/article';
import 'styles'

loadCategoriesMenu();
loadCountriesMenu();
loadLanguagesMenu();

const ARTICLES_CONTAINER = document.getElementById('articles');
const NOTIFICATION_CONTAINER = document.getElementById('notification');

function loadSources() {
    const source = new Source();

    const category = categoriesService.getCategory(settingsService.get('category'));
    const country = countriesService.getCountry(settingsService.get('country'));
    const language = languagesService.getLanguage(settingsService.get('language'));

    const params = new Map([
        ['category', category.apiOption],
        ['country', country.apiOption],
        ['language', language.apiOption]
    ]);

    source.get(params)
        .then(function (sources) {
            for (let source of sources) {
                loadArticles(source);
            }
        })
        .catch(function(err){
            ARTICLES_CONTAINER.innerHTML = '';
            NOTIFICATION_CONTAINER.innerText = err.message;
        });
}

function loadArticles(source) {
    const article = new Article();
    const params = new Map([
        ['source', source.id],
    ]);


    ARTICLES_CONTAINER.innerHTML = '';
    NOTIFICATION_CONTAINER.innerText = '';
    article.get(params)
        .then(function (articles) {
            displayArticles(articles);
        })
        .catch(function(err){
            NOTIFICATION_CONTAINER.innerText = err.message;
        });
}

function displayArticles(articles){
    require.ensure([], function (require) {

        const ListArticles = require('./list_articles').default;

        let list = new ListArticles({
            articles: articles
        });

        ARTICLES_CONTAINER.appendChild(list.elem);
    });
}

function loadCategoriesMenu() {
    require.ensure([], function (require) {

        const MenuCategories = require('./menu_categories').default;
        const categoriesService = require('./services/categories').default;

        const categories = categoriesService.getCategories();

        let menu = new MenuCategories({
            categories: categories,
            activeCategory: settingsService.get('category')
        }, function(){
            loadSources();
        });

        document.getElementById('top-menu').appendChild(menu.elem);
    });
}

function loadCountriesMenu() {
    require.ensure([], function (require) {

        const MenuCountries = require('./menu_countries').default;
        const countriesService = require('./services/countries').default;

        let menu = new MenuCountries({
            countries: countriesService.getCountries(),
            activeCountry: settingsService.get('country')
        }, function(){
            loadSources();
        });

        document.getElementById('top-menu').appendChild(menu.elem);
    });
}

function loadLanguagesMenu() {
    require.ensure([], function (require) {

        const MenuLanguages = require('./menu_languages').default;
        const languagesService = require('./services/languages').default;

        let menu = new MenuLanguages({
            languages: languagesService.getLanguages(),
            activeLanguage: settingsService.get('language')
        }, function(){
            loadSources();
        });

        document.getElementById('top-menu').appendChild(menu.elem);
    });
}
