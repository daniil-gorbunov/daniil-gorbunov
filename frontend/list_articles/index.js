'use strict';

import template from './articles.jade';
import forEach from 'lodash/forEach';

export default class ListArticles {

    constructor(options, callback) {
        forEach(options.articles, (article) => ListArticles.beautify(article));

        const list = document.createElement('div');
        list.innerHTML = template(options);
        this.elem = list;
    }

    static beautify(article){
        article.author = article.author || 'anonymous';
        article.description = article.description || '';
        // article.urlToImage = article.urlToImage || constants.IMAGES_DIR + 'no_image.png';
        // article.publishedAt = article.publishedAt ? moment(article.publishedAt).format('lll') : '';
    }

}
