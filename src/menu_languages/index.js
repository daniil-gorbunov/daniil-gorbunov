'use strict';

import template from './menu.jade';
import settings from 'services/settings';
import languagesService from 'services/languages';
import './index.styl';

export default class MenuLanguages {

    constructor(clickCallback) {
        const menu = document.createElement('div');
        menu.innerHTML = template({
            languages: languagesService.getLanguages(),
            activeLanguage: settings.get('language')
        });

        for (let item of menu.querySelectorAll('li')) {
            const id = item.getAttribute('data-language');
            item.addEventListener('click', function () {
                MenuLanguages.setActive(id);
                menu.querySelector('li.active').classList.remove('active');
                item.classList.add('active');
                clickCallback();
            })
        }

        this.elem = menu;
    }

    static setActive(id) {
        settings.set('language', id);
    }
}
