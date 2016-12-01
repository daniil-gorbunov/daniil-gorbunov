'use strict';
import template from './menu_categories.jade';

export default class MenuCategories {
    constructor(options) {
        this.elem = document.createElement('div');
        this.elem.innerHTML = template(options);
    }
}

