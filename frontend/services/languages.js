'use strict';

import find from 'lodash/find';

const languages = [
    {
        id: 'en',
        title: 'English',
        flagId: 'us',
        apiOption: 'en',
        active: true
    }, {
        id: 'fr',
        title: 'French',
        flagId: 'fr',
        apiOption: 'fr'
    }, {
        id: 'de',
        title: 'German',
        flagId: 'de',
        apiOption: 'de'
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

    getLanguage(id){
        return find(this.languages, {'id': id});
    }
}

const instance = new LanguagesService();
Object.freeze(instance);

export default instance;
