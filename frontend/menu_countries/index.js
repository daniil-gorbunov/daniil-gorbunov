'use strict';

import template from './menu.jade';
import settings from 'services/settings';
import './index.styl';

export default class MenuCountries {

    constructor(options, callback) {
        const menu = document.createElement('div');
        menu.innerHTML = template(options);

        for (let item of menu.querySelectorAll('li')) {
            const id = item.getAttribute('data-country');
            item.addEventListener('click', function () {
                MenuCountries.setActive(id);
                menu.querySelector('li.active').classList.remove('active');
                item.classList.add('active');
                callback();
            })
        }

        this.elem = menu;
    }

    static setActive(id) {
        settings.set('country', id);
    }
}
