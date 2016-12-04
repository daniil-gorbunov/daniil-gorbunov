import settings from 'services/settings';
import Model from 'models/base_model';

export default class Article extends Model {

    constructor() {
        super(`${settings.get('api').url}${settings.get('api').articles}`);
    }

    get(params = new Map()) {
        return super.get(params)
            .then(function(data){
                if(data.status === 'ok'){
                    return data.articles;
                } else{
                    throw new Error(data.message);
                }
            })
    }
};
