import constants from './scripts/constants';
import Article from './scripts/models/article';
import Source from './scripts/models/source';
import moment from 'moment';
import './style.styl';

const ARTICLES_CONTAINER = document.getElementById('articles');
const NOTIFICATION_CONTAINER = document.getElementById('notification');

buildCategoriesMenu();
buildCountriesSwitcher();
buildLanguagesSwitcher();
loadSources();


function loadSources() {
    const source = new Source();
    const params = new Map([
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
    const article = new Article();
    const params = new Map([
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
    const articleContainer = document.createElement('div');
    const img = document.createElement('div');
    img.classList.add('image');
    if(article.urlToImage){
        img.innerHTML = `<img src="${article.urlToImage || constants.IMAGES_DIR + 'no_image.png'}" alt="${article.title}">`
    }else{
        img.classList.add('no-image');
    }
    articleContainer.setAttribute('class', 'article-container');
    articleContainer.innerHTML = `
<div class="header"><a target="_blank" href="${article.url}">${article.title}</a></div>
${img.outerHTML}
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
    const listContainer = document.getElementById('categories-list');
    for (let category in constants.CATEGORIES) {
        if (!constants.CATEGORIES.hasOwnProperty(category)) {
            continue;
        }
        const categoryListItem = document.createElement('li');
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
    const listContainer = document.getElementById('countries-list');
    for (let country in constants.COUNTRIES) {
        if (!constants.COUNTRIES.hasOwnProperty(country)) {
            continue;
        }
        const countryListItem = document.createElement('li');
        countryListItem.setAttribute(countryAttrName, country);
        countryListItem.classList.add('flag', 'flag-icon-background', `flag-icon-${constants.COUNTRIES[country]}`);
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
    const listContainer = document.getElementById('languages-list');
    for (let language in constants.LANGUAGES) {
        if (!constants.LANGUAGES.hasOwnProperty(language)) {
            continue;
        }
        const languageListItem = document.createElement('li');
        languageListItem.setAttribute(languageAttrName, language);
        languageListItem.classList.add('flag', 'flag-icon-background', `flag-icon-${constants.LANGUAGES[language]}`);
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
