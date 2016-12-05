'use strict';

import settingsService from 'services/settings';
import categoriesService from 'services/categories';
import countriesService from 'services/countries';
import languagesService from 'services/languages';
import ModelFactory from 'models/model_factory';
import 'styles'

loadCategoriesMenu();
loadCountriesMenu();
loadLanguagesMenu();

const ARTICLES_CONTAINER = document.getElementById('articles');
const NOTIFICATION_CONTAINER = document.getElementById('notification');
const modelFactory = new ModelFactory();

function loadSources() {
    const source = modelFactory.getSourcesModel();

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
    const article = modelFactory.getArticlesModel();
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

        ARTICLES_CONTAINER.innerHTML += list.elem.innerHTML;
    });
}

function loadCategoriesMenu() {
    require.ensure([], function (require) {

        const MenuCategories = require('./menu_categories').default;
        const menu = new MenuCategories(loadSources);

        document.getElementById('top-menu').appendChild(menu.elem);
    });
}

function loadCountriesMenu() {
    require.ensure([], function (require) {

        const MenuCountries = require('./menu_countries').default;
        const menu = new MenuCountries(loadSources);

        document.getElementById('top-menu').appendChild(menu.elem);
    });
}

function loadLanguagesMenu() {
    require.ensure([], function (require) {

        const MenuLanguages = require('./menu_languages').default;
        const menu = new MenuLanguages(loadSources);

        document.getElementById('top-menu').appendChild(menu.elem);
    });
}
