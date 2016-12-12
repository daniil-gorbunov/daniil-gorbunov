'use strict';

import template from './menu.jade';
import settings from 'services/settings';
import countriesService from 'services/countries';
import './index.styl';

export default class MenuCountries {

    constructor(mediator) {
        const menu = document.createElement('div');
        menu.innerHTML = template({
            countries: countriesService.getCountries(),
            activeCountry: settings.get('country')
        });

        for (let item of menu.querySelectorAll('li')) {
            const id = item.getAttribute('data-country');
            item.addEventListener('click', function () {
                menu.querySelector('li.active').classList.remove('active');
                item.classList.add('active');
                mediator.notify({
                    type: 'countrySelected',
                    value: id
                });
            })
        }

        this.elem = menu;
    }
}
