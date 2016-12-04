'use strict';

import find from 'lodash/find';

const categories = [
    {
        id: '1',
        title: 'Business',
        apiOption: 'business'
    }, {
        id: '2',
        title: 'Entertainment',
        apiOption: 'entertainment'
    }, {
        id: '3',
        title: 'Gaming',
        apiOption: 'gaming'
    }, {
        id: '4',
        title: 'General',
        apiOption: 'general',
        active: true
    }, {
        id: '5',
        title: 'Music',
        apiOption: 'music'
    }, {
        id: '6',
        title: 'Science and Nature',
        apiOption: 'science-and-nature'
    }, {
        id: '7',
        title: 'Sport',
        apiOption: 'sport'
    }, {
        id: '8',
        title: 'Technology',
        apiOption: 'technology'
    }
];

class CategoriesService {

    constructor() {
        if (!CategoriesService.instance) {
            this.categories = categories;

            CategoriesService.instance = this;
        }

        return CategoriesService.instance;
    }

    getCategories() {
        return this.categories;
    }

    getCategory(id){
        return find(this.categories, {id: id});
    }
}

const instance = new CategoriesService();
Object.freeze(instance);

export default instance;
