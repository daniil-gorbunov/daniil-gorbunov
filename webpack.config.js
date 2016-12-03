'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    context: __dirname + '/frontend',
    entry:  ['babel-polyfill', './main'],
    output:  {
        path:     __dirname + '/public',
        publicPath: '',
        filename: '[name].js'
    },

    resolve: {
        root: path.resolve('./frontend'),
        extensions: ['', '.js', '.styl']
    },

    watch: NODE_ENV == 'development',

    devtool: NODE_ENV == 'development' ? 'eval' : null,

    plugins: [
        new webpack.DefinePlugin({NODE_ENV: JSON.stringify(NODE_ENV)}),
        new ExtractTextPlugin('[name].css', {allChunks: true}),
        new HtmlWebpackPlugin({filename: 'index.html', template: 'index.jade'})
    ],

    module: {
        loaders: [{
            test:   /\.js$/,
            loader: "babel?presets[]=es2015"
        }, {
            test:   /\.jade$/,
            loader: "jade"
        }, {
            test:   /\.styl$/,
            loader: ExtractTextPlugin.extract('css!stylus?paths[]=node_modules,paths[]=frontend&include css&resolve url')
        }, {
            test:   /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
            loader: 'file?name=./img/[path][name].[ext]'
        }]
    },
};
