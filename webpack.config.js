const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

require('es6-promise').polyfill();

module.exports = {
    context: __dirname + '/src',

    entry: './index',
    output: {
        path: 'public',
        publicPath: './',
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
        }),
        new webpack.ContextReplacementPlugin(/node_modules\/moment\/locale/, /en-gb/)
    ],

    module: {
        loaders: [{
            test: /\.js$/,
            include: __dirname + '/src',
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
            test: /\.styl/,
            loader: 'style!css!stylus?resolve url'
        }, {
            test: /\.(png|jpg|svg)$/,
            loader: 'file?name=[1].[ext]&regExp=node_modules/(.*)'
        }]
    },

    devServer: {
        host: 'localhost',
        port: 8001,
        contentBase: __dirname + '/public'
    }

};
