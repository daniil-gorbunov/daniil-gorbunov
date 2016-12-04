'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    context: __dirname + '/frontend',
    entry:  './main',
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
        new webpack.ContextReplacementPlugin(/node_modules\/moment\/locale/, /en/),
        new webpack.optimize.CommonsChunkPlugin({name: 'common'}),
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
            loader: 'url?name=[path][name].[ext]&limit=4096'
        }]
    },

    devServer: {
        host: 'localhost',
        port: 8080,
        contentBase: __dirname + '/public'
    }
};
