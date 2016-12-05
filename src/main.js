'use strict';

import categoriesService from 'services/categories';
import countriesService from 'services/countries';
import languagesService from 'services/languages';
import settingsService from 'services/settings';
import ModelFactory from 'models/model_factory';
import forEach from 'lodash/forEach';
import 'styles'

const NOTIFICATION_CONTAINER = document.getElementById('notification');
const ARTICLES_CONTAINER = document.getElementById('articles');
const TOP_MENU = document.getElementById('top-menu');
const modelFactory = new ModelFactory();

loadCategoriesMenu();
loadCountriesMenu();
loadLanguagesMenu();

class MenuMediator {
    notify(event){
        console.log(event);
    }
}

const menuMediator = new MenuMediator();

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
        const menu = new MenuCategories(loadSources, menuMediator);
        TOP_MENU.appendChild(menu.elem);
    });
}

function loadCountriesMenu() {
    require.ensure([], function (require) {
        const MenuCountries = require('./menu_countries').default;
        const menu = new MenuCountries(loadSources, menuMediator);
        TOP_MENU.appendChild(menu.elem);
    });
}

function loadLanguagesMenu() {
    require.ensure([], function (require) {
        const MenuLanguages = require('./menu_languages').default;
        const menu = new MenuLanguages(loadSources, menuMediator);
        TOP_MENU.appendChild(menu.elem);
    });
}
