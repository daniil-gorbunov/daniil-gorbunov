'use strict';

import template from './articles.jade';
import forEach from 'lodash/forEach';
import moment from 'moment';
import noImg from 'styles/img/no_image.png'

export default class ListArticles {

    constructor(options) {
        forEach(options.articles, (article) => ListArticles.beautify(article));

        const list = document.createElement('div');
        list.innerHTML = template(options);
        this.elem = list;
    }

    static beautify(article){
        article.author = article.author || 'anonymous';
        article.description = article.description || '';
        article.urlToImage = article.urlToImage || noImg;
        article.publishedAt = article.publishedAt ? moment(article.publishedAt).format('lll') : '';
    }

}
