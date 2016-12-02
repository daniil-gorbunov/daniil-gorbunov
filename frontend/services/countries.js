'use strict';

const countries = [
    {
        id: 1,
        title: 'Australia',
        abbr: 'au'
    }, {
        id: 2,
        title: 'Germany',
        abbr: 'de'
    }, {
        id: 3,
        title: 'Great Britain',
        abbr: 'gb'
    }, {
        id: 4,
        title: 'India',
        abbr: 'in'
    }, {
        id: 5,
        title: 'Italy',
        abbr: 'it'
    }, {
        id: 6,
        title: 'USA',
        abbr: 'us',
        active: true
    }
];

class CountriesService {

    constructor() {
        if (!CountriesService.instance) {
            this.countries = countries;

            CountriesService.instance = this;
        }

        return CountriesService.instance;
    }

    getCountries() {
        return this.countries;
    }
}

const instance = new CountriesService();
Object.freeze(instance);

export default instance;
