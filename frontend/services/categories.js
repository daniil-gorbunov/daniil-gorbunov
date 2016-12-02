'use strict';

const categories = [
    {
        id: 1,
        title: 'Business',
    }, {
        id: 2,
        title: 'Entertainment',
    }, {
        id: 3,
        title: 'Gaming',
    }, {
        id: 4,
        title: 'General',
        active: true
    }, {
        id: 5,
        title: 'Music',
    }, {
        id: 6,
        title: 'Science and Nature',
    }, {
        id: 7,
        title: 'Sport',
    }, {
        id: 8,
        title: 'Technology',
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
}

const instance = new CategoriesService();
Object.freeze(instance);

export default instance;
