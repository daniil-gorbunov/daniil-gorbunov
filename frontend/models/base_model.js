import settings from 'services/settings';

export default class BaseModel {

    constructor(apiUri) {
        this.apiUri = apiUri;
        this.apiKey = settings.get('api')['key'];
    }

    get(params = new Map()) {
        params.set('apiKey', this.apiKey);
        const uri = `${this.apiUri}?${BaseModel.serialize(params)}`;
        const init = {
            method: 'GET'
        };
        const request = new Request(uri, init);

        return fetch(request)
            .then(
                response => response.json()
                    .then(json => json)
            )
            .catch(err => []);
    }

    static serialize(params = new Map()) {
        const result = [];
        for (let [p, v] of params) {
            const param = encodeURIComponent(p);
            const value = encodeURIComponent(v);
            result.push(`${param}=${value}`);
        }

        return result.join('&');
    }
};
