let constants = require('../constants');
let Generators = require('../generators');
let Model = require('./model');

module.exports = class Article extends Model {

    constructor() {
        super(`${constants.NEWS_API_URL}${constants.NEWS_API_ARTICLES}`)
    }

    get(params = new Map()) {
        return super.get(params)
            .then(function(data){
                if(data.status === 'ok'){
                    return Generators.articleGenerator(data)
                } else{
                    throw new Error(data.message)
                }
            })
    }
};
