'use strict';

import _ from 'lodash';

const countries = [
    {
        id: '1',
        title: 'Australia',
        abbr: 'au',
        apiOption: 'au'
    }, {
        id: '2',
        title: 'Germany',
        abbr: 'de',
        apiOption: 'de'
    }, {
        id: '3',
        title: 'Great Britain',
        abbr: 'gb',
        apiOption: 'gb'
    }, {
        id: '4',
        title: 'India',
        abbr: 'in',
        apiOption: 'in'
    }, {
        id: '5',
        title: 'Italy',
        abbr: 'it',
        apiOption: 'it'
    }, {
        id: '6',
        title: 'USA',
        abbr: 'us',
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
        return _.find(this.countries, {'id': id});
    }
}

const instance = new CountriesService();
Object.freeze(instance);

export default instance;
