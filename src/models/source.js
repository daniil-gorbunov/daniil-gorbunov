class Source extends Model {

    constructor() {
        super(`${NEWS_API_URL}${MEWS_API_SOURCES}`)
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
}
