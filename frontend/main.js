'use strict';

require.ensure([], function (require) {
    let MenuCategories = require('./menu_categories');

    // const categoryAttrName = 'data-category';
    const listContainer = document.getElementById('categories-list');
    let categories = [
        {
            id: 1,
            title: 'cat 1'
        }, {
            id: 2,
            title: 'cat 2'
        }, {
            id: 3,
            title: 'cat 3',
            active: true
        }
    ];
    // for (let category in constants.CATEGORIES) {
    //     if (!constants.CATEGORIES.hasOwnProperty(category)) {
    //         continue;
    //     }
    //     const categoryListItem = document.createElement('li');
    //     categoryListItem.setAttribute(categoryAttrName, category);
    //     categoryListItem.innerText = constants.CATEGORIES[category];
    //     categoryListItem.addEventListener('click', function () {
    //         constants.GLOBAL_SETTINGS.category = this.getAttribute(categoryAttrName);
    //         document.querySelector('#categories-list li.active').classList.remove('active');
    //         this.classList.add('active');
    //         loadSources();
    //     });
    //     if(category === constants.GLOBAL_SETTINGS.category){
    //         categoryListItem.classList.add('active');
    //     }
    //     listContainer.appendChild(categoryListItem);
    // }

    let menuCategories = new MenuCategories({
        categories: categories
    });

    listContainer.appendChild(menuCategories.elem);
});
