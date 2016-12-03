'use strict';

import _ from 'lodash';

const languages = [
    {
        id: '1',
        title: 'English',
        abbr: 'us',
        apiOption: 'en',
        active: true
    }, {
        id: '2',
        title: 'French',
        abbr: 'fr',
        apiOption: 'fr'
    }, {
        id: '3',
        title: 'German',
        abbr: 'de',
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
        return _.find(this.languages, {'id': id});
    }
}

const instance = new LanguagesService();
Object.freeze(instance);

export default instance;
