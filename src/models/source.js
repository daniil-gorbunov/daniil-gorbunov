import settings from 'services/settings';
import BaseModel from 'models/base_model';

export default class Source extends BaseModel {

    constructor() {
        super(`${settings.get('api').url}${settings.get('api').sources}`);
    }

    get(params = new Map()) {
        return super.get(params)
            .then(function(data){
                if(data.status === 'ok'){
                    return data.sources;
                } else{
                    throw new Error(data.message);
                }
            })
    }
};
