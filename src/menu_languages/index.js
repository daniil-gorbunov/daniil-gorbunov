'use strict';

import template from './menu.jade';
import settings from 'services/settings';
import languagesService from 'services/languages';
import './index.styl';

export default class MenuLanguages {

    constructor(mediator) {
        const menu = document.createElement('div');
        menu.innerHTML = template({
            languages: languagesService.getLanguages(),
            activeLanguage: settings.get('language')
        });

        for (let item of menu.querySelectorAll('li')) {
            const id = item.getAttribute('data-language');
            item.addEventListener('click', function () {
                menu.querySelector('li.active').classList.remove('active');
                item.classList.add('active');
                mediator.notify({
                    type: 'languageSelected',
                    value: id
                });
            })
        }

        this.elem = menu;
    }
}
