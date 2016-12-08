import settings from 'services/settings';
import BaseModel from 'models/base_model';

export default class ModelFactory {

    getArticlesModel() {
        class Article extends BaseModel {

            constructor() {
                super(`${settings.get('api').url}${settings.get('api').articles}`);
            }

            get(params = new Map()) {
                return super.get(params)
                    .then(function (data) {
                        if (data.status === 'ok') {
                            return data.articles;
                        } else {
                            throw new Error(data.message);
                        }
                    })
            }
        }

        if (!this.articleInstance) {
            this.articleInstance = new Article();
        }

        return this.articleInstance;
    }

    getSourcesModel() {
        class Source extends BaseModel {

            constructor() {
                super(`${settings.get('api').url}${settings.get('api').sources}`);
            }

            get(params = new Map()) {
                return super.get(params)
                    .then(function (data) {
                        if (data.status === 'ok') {
                            return data.sources;
                        } else {
                            throw new Error(data.message);
                        }
                    })
            }
        }

        if (!this.sourceInstance) {
            this.sourceInstance = new Source();
        }

        return this.sourceInstance;
    }
}
