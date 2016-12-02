'use strict';

import settingsService from './services/settings'

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

    const countries = countriesService.getCountries();
    console.log(countries);

    let menu = new MenuCountries({
        countries: countries,
        activeCountry: settingsService.get('country')
    });

    document.getElementById('top-menu').appendChild(menu.elem);
});

require.ensure([], function (require) {

    const MenuLanguages = require('./menu_languages').default;
    const languagesService = require('./services/languages').default;

    const languages = languagesService.getLanguages();
    console.log(languages);

    let menu = new MenuLanguages({
        languages: languages,
        activeLanguage: settingsService.get('language')
    });

    document.getElementById('top-menu').appendChild(menu.elem);
});
