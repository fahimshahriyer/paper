const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const extractPlugin = new ExtractTextPlugin({ filename: './assets/styles/app.css' });

const config = {
    context: path.resolve(__dirname,'src'),
    entry: {
      app: './app.js'  
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './assets/js/bundle.js',
    },
    module: {
        rules: [
            //babel-loader
            {
                test: /\.js$/,
                include: /src/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['env']
                    }
                }
            },
            // html-loader
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            // sass-loader
            {
                test: /\.scss$/,
                include: [path.resolve(__dirname, 'src', 'assets', 'styles')],
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            },
            //file-loader (images)
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './assets/media/'
                        }
                    }
                ]
            },
            //file-loader (fonts)
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template : 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        extractPlugin
    ],
    devServer : {
        contentBase: path.resolve(__dirname, "./dist/assets/"),
        compress: true,
        stats: 'errors-only',
        open: true,
    },
    devtool: 'inline-source-map'
};

module.exports = config;