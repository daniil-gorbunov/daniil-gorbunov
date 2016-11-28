const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
    entry: './src/index',
    output: {
        path: __dirname + '/scripts',
        filename: 'app.js'
    },
    watch: NODE_ENV == 'development',

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV == 'development' ? 'source-map' : null,
    
    plugins: [
        new webpack.EnvironmentPlugin('NODE_ENV')
    ],

    loaders: [{
        test: /\.js$/,
        loader: 'babel-loader?optional[]=runtime&stage=0'
    }]

};
