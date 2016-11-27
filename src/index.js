let constants = require('./constants');
let Article = require('./models/article');
let Source = require('./models/source');
let moment = require('moment');

const ARTICLES_CONTAINER = document.getElementById('articles');
const NOTIFICATION_CONTAINER = document.getElementById('notification');

buildCategoriesMenu();
buildCountriesSwitcher();
buildLanguagesSwitcher();
loadSources();


function loadSources() {
    let source = new Source();
    let params = new Map([
        ['category', constants.GLOBAL_SETTINGS.category],
        ['country', constants.GLOBAL_SETTINGS.country],
        ['language', constants.GLOBAL_SETTINGS.language],
    ]);

    source.get(params)
        .then(function (sources) {
            ARTICLES_CONTAINER.innerHTML = '';
            for (let source of sources) {
                loadArticles(source);
            }
        })
        .catch(function(err){
            ARTICLES_CONTAINER.innerHTML = '';
            NOTIFICATION_CONTAINER.innerText = err.message;
        });
}

function loadArticles(source) {
    let article = new Article();
    let params = new Map([
        ['source', source.id],
    ]);

    article.get(params)
        .then(function (articles) {
            ARTICLES_CONTAINER.innerHTML = '';
            for (let article of articles) {
                displayArticle(article);
            }
        })
        .catch(function(err){
            ARTICLES_CONTAINER.innerHTML = '';
            NOTIFICATION_CONTAINER.innerText = err.message;
        });
}

function displayArticle(article) {
    let articleContainer = document.createElement('div');
    articleContainer.setAttribute('class', 'article-container');
    articleContainer.innerHTML = `
<div class="header"><a target="_blank" href="${article.url}">${article.title}</a></div>
<div class="image"><img src="${article.urlToImage || constants.IMAGES_DIR + 'no_image.png'}" alt="${article.title}"></div>
<div class="description">${article.description || ''}</div>
<div class="footer">
    <div class="author">${article.author || 'anonymous'}</div>
    <div class="pubdate">${article.publishedAt ? moment(article.publishedAt).format('lll') : ''}</div>
</div>
`;
    ARTICLES_CONTAINER.appendChild(articleContainer);
}

function buildCategoriesMenu() {
    const categoryAttrName = 'data-category';
    let listContainer = document.getElementById('categories-list');
    for (let category in constants.CATEGORIES) {
        if (!constants.CATEGORIES.hasOwnProperty(category)) {
            continue;
        }
        let categoryListItem = document.createElement('li');
        categoryListItem.setAttribute(categoryAttrName, category);
        categoryListItem.innerText = constants.CATEGORIES[category];
        categoryListItem.addEventListener('click', function () {
            constants.GLOBAL_SETTINGS.category = this.getAttribute(categoryAttrName);
            document.querySelector('#categories-list li.active').classList.remove('active');
            this.classList.add('active');
            loadSources();
        });
        if(category === constants.GLOBAL_SETTINGS.category){
            categoryListItem.classList.add('active');
        }
        listContainer.appendChild(categoryListItem);
    }
}

function buildCountriesSwitcher() {
    const countryAttrName = 'data-country';
    let listContainer = document.getElementById('countries-list');
    for (let country in constants.COUNTRIES) {
        if (!constants.COUNTRIES.hasOwnProperty(country)) {
            continue;
        }
        let countryListItem = document.createElement('li');
        countryListItem.setAttribute(countryAttrName, country);
        countryListItem.innerHTML = `<img src="${constants.FLAGS_DIR}${constants.COUNTRIES[country]}" alt="${country}">`;
        countryListItem.addEventListener('click', function () {
            constants.GLOBAL_SETTINGS.country = this.getAttribute(countryAttrName);
            document.querySelector('#countries-list li.active').classList.remove('active');
            this.classList.add('active');
            loadSources();
        });
        if(country === constants.GLOBAL_SETTINGS.country){
            countryListItem.classList.add('active');
        }
        listContainer.appendChild(countryListItem);
    }
}

function buildLanguagesSwitcher() {
    const languageAttrName = 'data-language';
    let listContainer = document.getElementById('languages-list');
    for (let language in constants.LANGUAGES) {
        if (!constants.LANGUAGES.hasOwnProperty(language)) {
            continue;
        }
        let languageListItem = document.createElement('li');
        languageListItem.setAttribute(languageAttrName, language);
        languageListItem.innerHTML = `<img src="${constants.FLAGS_DIR}${constants.LANGUAGES[language]}" alt="${language}">`;
        languageListItem.addEventListener('click', function () {
            constants.GLOBAL_SETTINGS.language = this.getAttribute(languageAttrName);
            document.querySelector('#languages-list li.active').classList.remove('active');
            this.classList.add('active');
            loadSources();
        });
        if(language === constants.GLOBAL_SETTINGS.language){
            languageListItem.classList.add('active');
        }
        listContainer.appendChild(languageListItem);
    }
}
