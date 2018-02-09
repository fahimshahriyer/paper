const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {

    devtool: 'cheap-module-source-map',

    output: {
        path: path.join(__dirname, 'build'),
        filename: './assets/js/bundle.js'
    },

    plugins: [
        new CleanWebpackPlugin(['build'])
    ]

});