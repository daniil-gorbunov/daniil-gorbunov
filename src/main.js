'use strict';

import 'styles'
import categoriesService from 'services/categories';
import countriesService from 'services/countries';
import languagesService from 'services/languages';
import menuMediator from 'services/menu_mediator';
import settingsService from 'services/settings';
import ModelFactory from 'models/model_factory';
import forEach from 'lodash/forEach';

const NOTIFICATION_CONTAINER = document.getElementById('notification');
const ARTICLES_CONTAINER = document.getElementById('articles');
const TOP_MENU = document.getElementById('top-menu');
const modelFactory = new ModelFactory();

menuMediator.setMainLoader(loadSources);
loadCategoriesMenu();
loadCountriesMenu();
loadLanguagesMenu();

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
        .then(sources => forEach(sources, loadArticles))
        .catch(err => showNotification(err.message))
}

function loadArticles(source) {
    const article = modelFactory.getArticlesModel();

    const params = new Map([['source', source.id]]);

    ARTICLES_CONTAINER.innerHTML = '';
    NOTIFICATION_CONTAINER.innerText = '';
    article.get(params)
        .then(articles => displayArticles(articles))
        .catch(err => showNotification(err.message))
}

function displayArticles(articles) {
    require.ensure([], function (require) {
        const ListArticles = require('./list_articles').default;
        const list = new ListArticles({articles});
        ARTICLES_CONTAINER.innerHTML += list.elem.innerHTML;
    });
}

function showNotification(msg) {
    ARTICLES_CONTAINER.innerHTML = '';
    NOTIFICATION_CONTAINER.innerText = msg;
}

function loadCategoriesMenu() {
    require.ensure([], function (require) {
        const MenuCategories = require('./menu_categories').default;
        const menu = new MenuCategories(menuMediator);
        TOP_MENU.appendChild(menu.elem);
    });
}

function loadCountriesMenu() {
    require.ensure([], function (require) {
        const MenuCountries = require('./menu_countries').default;
        const menu = new MenuCountries(menuMediator);
        TOP_MENU.appendChild(menu.elem);
    });
}

function loadLanguagesMenu() {
    require.ensure([], function (require) {
        const MenuLanguages = require('./menu_languages').default;
        const menu = new MenuLanguages(menuMediator);
        TOP_MENU.appendChild(menu.elem);
    });
}
