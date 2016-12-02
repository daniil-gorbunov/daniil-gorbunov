'use strict';

import settingsService from './services/settings'
import 'styles'

require.ensure([], function (require) {

    const MenuCategories = require('./menu_categories').default;
    const categoriesService = require('./services/categories').default;

    const categories = categoriesService.getCategories();

    let menu = new MenuCategories({
        categories: categories,
        activeCategory: settingsService.get('category')
    });

    document.getElementById('top-menu').appendChild(menu.elem);
});

require.ensure([], function (require) {

    const MenuCountries = require('./menu_countries').default;
    const countriesService = require('./services/countries').default;

    let menu = new MenuCountries({
        countries: countriesService.getCountries(),
        activeCountry: settingsService.get('country')
    });

    document.getElementById('top-menu').appendChild(menu.elem);
});

require.ensure([], function (require) {

    const MenuLanguages = require('./menu_languages').default;
    const languagesService = require('./services/languages').default;

    let menu = new MenuLanguages({
        languages: languagesService.getLanguages(),
        activeLanguage: settingsService.get('language')
    });

    document.getElementById('top-menu').appendChild(menu.elem);
});
