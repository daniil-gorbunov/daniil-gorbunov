import constants from '../constants';
import Generators from'../generators';
import Model from './model';

export default class Source extends Model {

    constructor() {
        super(`${constants.NEWS_API_URL}${constants.NEWS_API_SOURCES}`)
    }

    get(params = new Map()) {
        return super.get(params)
            .then(function(data){
                if(data.status === 'ok'){
                    return Generators.sourceGenerator(data)
                } else{
                    throw new Error(data.message)
                }
            })
    }
};
