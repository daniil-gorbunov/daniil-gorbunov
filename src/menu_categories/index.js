'use strict';

import template from './menu.jade';
import settings from 'services/settings';
import categoriesService from 'services/categories';
import './index.styl'

export default class MenuCategories {

    constructor(clickCallback, mediator) {
        const menu = document.createElement('div');
        menu.innerHTML = template({
            categories: categoriesService.getCategories(),
            activeCategory: settings.get('category')
        });

        for (let item of menu.querySelectorAll('li')) {
            const id = item.getAttribute('data-category');
            item.addEventListener('click', function () {
                MenuCategories.setActive(id);
                const activeItem = menu.querySelector('li.active');
                if(activeItem) {
                    activeItem.classList.remove('active');
                }
                item.classList.add('active');
                mediator.notify({
                    type: 'categorySelected',
                    value: id
                });
                clickCallback();
            })
        }

        this.elem = menu;
    }

    static setActive(id) {
        settings.set('category', id);
    }
}
