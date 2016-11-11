class Article extends Model {

    constructor() {
        super(`${NEWS_API_URL}${NEWS_API_ARTICLES}`)
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
}
