'use strict';

var ARTICLES_CONTAINER = document.getElementById('articles');
var NOTIFICATION_CONTAINER = document.getElementById('notification');

buildCategoriesMenu();
buildCountriesSwitcher();
buildLanguagesSwitcher();
loadSources();

function loadSources() {
    var source = new Source();
    var params = new Map([['category', GLOBAL_SETTINGS.category], ['country', GLOBAL_SETTINGS.country], ['language', GLOBAL_SETTINGS.language]]);

    source.get(params).then(function (sources) {
        ARTICLES_CONTAINER.innerHTML = '';
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = sources[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _source = _step.value;

                loadArticles(_source);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }).catch(function (err) {
        ARTICLES_CONTAINER.innerHTML = '';
        NOTIFICATION_CONTAINER.innerText = err.message;
    });
}

function loadArticles(source) {
    var article = new Article();
    var params = new Map([['source', source.id]]);

    article.get(params).then(function (articles) {
        ARTICLES_CONTAINER.innerHTML = '';
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = articles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _article = _step2.value;

                displayArticle(_article);
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
    }).catch(function (err) {
        ARTICLES_CONTAINER.innerHTML = '';
        NOTIFICATION_CONTAINER.innerText = err.message;
    });
}

function displayArticle(article) {
    var articleContainer = document.createElement('div');
    articleContainer.setAttribute('class', 'article-container');
    articleContainer.innerHTML = '\n<div class="header"><a target="_blank" href="' + article.url + '">' + article.title + '</a></div>\n<div class="image"><img src="' + (article.urlToImage || IMAGES_DIR + 'no_image.png') + '" alt="' + article.title + '"></div>\n<div class="description">' + (article.description || '') + '</div>\n<div class="footer">\n    <div class="author">' + (article.author || 'anonymous') + '</div>\n    <div class="pubdate">' + (article.publishedAt ? moment(article.publishedAt).format('lll') : '') + '</div>\n</div>\n';
    ARTICLES_CONTAINER.appendChild(articleContainer);
}

function buildCategoriesMenu() {
    var categoryAttrName = 'data-category';
    var listContainer = document.getElementById('categories-list');
    for (var category in CATEGORIES) {
        if (!CATEGORIES.hasOwnProperty(category)) {
            continue;
        }
        var categoryListItem = document.createElement('li');
        categoryListItem.setAttribute(categoryAttrName, category);
        categoryListItem.innerText = CATEGORIES[category];
        categoryListItem.addEventListener('click', function () {
            GLOBAL_SETTINGS.category = this.getAttribute(categoryAttrName);
            document.querySelector('#categories-list li.active').classList.remove('active');
            this.classList.add('active');
            loadSources();
        });
        if (category === GLOBAL_SETTINGS.category) {
            categoryListItem.classList.add('active');
        }
        listContainer.appendChild(categoryListItem);
    }
}

function buildCountriesSwitcher() {
    var countryAttrName = 'data-country';
    var listContainer = document.getElementById('countries-list');
    for (var country in COUNTRIES) {
        if (!COUNTRIES.hasOwnProperty(country)) {
            continue;
        }
        var countryListItem = document.createElement('li');
        countryListItem.setAttribute(countryAttrName, country);
        countryListItem.innerHTML = '<img src="' + FLAGS_DIR + COUNTRIES[country] + '" alt="' + country + '">';
        countryListItem.addEventListener('click', function () {
            GLOBAL_SETTINGS.country = this.getAttribute(countryAttrName);
            document.querySelector('#countries-list li.active').classList.remove('active');
            this.classList.add('active');
            loadSources();
        });
        if (country === GLOBAL_SETTINGS.country) {
            countryListItem.classList.add('active');
        }
        listContainer.appendChild(countryListItem);
    }
}

function buildLanguagesSwitcher() {
    var languageAttrName = 'data-language';
    var listContainer = document.getElementById('languages-list');
    for (var language in LANGUAGES) {
        if (!LANGUAGES.hasOwnProperty(language)) {
            continue;
        }
        var languageListItem = document.createElement('li');
        languageListItem.setAttribute(languageAttrName, language);
        languageListItem.innerHTML = '<img src="' + FLAGS_DIR + LANGUAGES[language] + '" alt="' + language + '">';
        languageListItem.addEventListener('click', function () {
            GLOBAL_SETTINGS.language = this.getAttribute(languageAttrName);
            document.querySelector('#languages-list li.active').classList.remove('active');
            this.classList.add('active');
            loadSources();
        });
        if (language === GLOBAL_SETTINGS.language) {
            languageListItem.classList.add('active');
        }
        listContainer.appendChild(languageListItem);
    }
}