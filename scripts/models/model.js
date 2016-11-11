class Model {

    constructor(apiUri) {
        this.apiUri = apiUri;
        this.apiKey = API_KEY;
    }

    get(params = new Map()) {
        params.set('apiKey', this.apiKey);
        let uri = `${this.apiUri}?${Model.serialize(params)}`;
        let init = {
            method: 'GET'
        };
        let request = new Request(uri, init);

        return fetch(request)
            .then(response => response.json()
                .then(json => json)
            )
            .catch(err => [])
    }

    static serialize(params = new Map()) {
        let result = [];
        for (let [p, v] of params) {
            let param = encodeURIComponent(p);
            let value = encodeURIComponent(v);
            result.push(`${param}=${value}`);
        }

        return result.join('&');
    }
}
