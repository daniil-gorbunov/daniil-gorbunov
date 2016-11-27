'use strict';

module.exports = {
    entry: './src/index',
    output: {
        path: __dirname + '/scripts',
        filename: 'app.js'
    },
    watch: true,

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: 'source-map',

};
