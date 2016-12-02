'use strict';

const languages = [
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

class LanguagesService {

    constructor() {
        if (!LanguagesService.instance) {
            this.languages = languages;

            LanguagesService.instance = this;
        }

        return LanguagesService.instance;
    }

    getLanguages() {
        return this.languages;
    }
}

const instance = new LanguagesService();
Object.freeze(instance);

export default instance;
