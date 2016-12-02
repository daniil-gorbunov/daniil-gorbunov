'use strict';

class SettingsService {

    constructor() {
        if (!SettingsService.instance) {
            this.settings = {
                category: 4,
                country: 1,
                language: 1
            };

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
