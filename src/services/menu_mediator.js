'use strict';

import settings from 'services/settings';

class MenuMediator {

    constructor() {
        const self = this;
        this.eventCallbacks = {
            categorySelected: function (event) {
                settings.set('category', event.value);
                self.loadSources();
            },
            countrySelected: function (event) {
                settings.set('country', event.value);
                self.loadSources();

            },
            languageSelected: function (event) {
                settings.set('language', event.value);
                self.loadSources();
            }
        };

        this.defaultEventCallback = function (event) {
            console.log('Unsupported event: ', event);
        };

        this.defaultSourcesLoader = function () {
            console.log('Sources loader was not set');
        };
    }

    notify(event) {
        const callback = this.eventCallbacks[event.type] || this.defaultEventCallback;
        callback(event);
    }

    setMainLoader(loader) {
        this.loadSources = loader || this.defaultSourcesLoader;
    }
}

export default new MenuMediator();
