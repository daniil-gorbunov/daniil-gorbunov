export default class Generators {
    static * articleGenerator(response) {
        let idx = 0;
        while (idx < response.articles.length) {
            yield response.articles[idx++];
        }
    }

    static * sourceGenerator(response) {
        let idx = 0;
        while (idx < response.sources.length) {
            yield response.sources[idx++];
        }
    }
};
