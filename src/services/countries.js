'use strict';

import find from 'lodash/find';

const countries = [
    {
        id: 'au',
        title: 'Australia',
        flagId: 'au',
        apiOption: 'au'
    }, {
        id: 'de',
        title: 'Germany',
        flagId: 'de',
        apiOption: 'de'
    }, {
        id: 'gb',
        title: 'Great Britain',
        flagId: 'gb',
        apiOption: 'gb'
    }, {
        id: 'in',
        title: 'India',
        flagId: 'in',
        apiOption: 'in'
    }, {
        id: 'it',
        title: 'Italy',
        flagId: 'it',
        apiOption: 'it'
    }, {
        id: 'us',
        title: 'USA',
        flagId: 'us',
        apiOption: 'us',
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

    getCountry(id){
        return find(this.countries, {'id': id});
    }
}

const instance = new CountriesService();
Object.freeze(instance);

export default instance;
