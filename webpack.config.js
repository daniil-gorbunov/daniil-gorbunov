const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
    context: __dirname + '/src',

    entry: './index',
    output: {
        path: 'public',
        publicPath: '/',
        filename: 'app.js'
    },

    watch: NODE_ENV == 'development',
    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV == 'development' ? 'source-map' : null,

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        })/*,
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2
        })*/
    ],

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: [
                    'es2015',
                    'stage-0'
                ],
                plugins: [
                    'transform-runtime'
                ]
            }
        }, {
            test: /\.(png|jpg|svg)$/,
            loader: 'url?name=[path][name].[ext]&limit=4096'
        }]
    }

};
