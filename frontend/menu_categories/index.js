'use strict';

import template from './menu.jade';
import settings from 'services/settings'

export default class MenuCategories {

    constructor(options, callback) {
        const menu = document.createElement('div');
        menu.innerHTML = template(options);

        for (let item of menu.querySelectorAll('li')) {
            const id = item.getAttribute('data-category');
            item.addEventListener('click', function () {
                MenuCategories.setActive(id);
                menu.querySelector('li.active').classList.remove('active');
                item.classList.add('active');
                callback()
            })
        }

        this.elem = menu;
    }

    static setActive(id) {
        settings.set('category', id);
    }
}
