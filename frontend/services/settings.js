'use strict';

const settings = {
    api: {
        key: '6d2df7867b8e4cda9d90ea70b9895d9c',
        url: 'https://newsapi.org/v1/',
        articles: 'articles',
        sources: 'sources',
    },
    category: null,
    country: 'us',
    language: 'en',
};

class SettingsService {

    constructor() {
        if (!SettingsService.instance) {
            this.settings = settings;

            SettingsService.instance = this;
        }

        return SettingsService.instance;
    }

    get(setting) {
        return this.settings[setting];
    }

    set(setting, value) {
        this.settings[setting] = value;
    }
}

const instance = new SettingsService();
Object.freeze(instance);

export default instance;
