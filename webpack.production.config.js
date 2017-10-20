'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        path.join(__dirname, 'app/main.jsx')
    ],
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name]-[hash].min.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new HtmlWebpackPlugin({
            template: 'app/index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new ExtractTextPlugin({
            filename: '[name]-[hash].css'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                screw_ie8: true
            }
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
    ],
    module: {
        rules: [{
            test: /\.(js|jsx)?$/,
            exclude: /node_modules/,
            use:[
              {
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'env']
                }
              }
            ]
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) =>[
                                require('autoprefixer')({
                                    browsers: ['chrome >= 35', 'safari >= 7', 'firefox >= 29' , 'ie > 8']
                                })
                            ]
                        }
                    }, 'sass-loader']
            })
        }]
    }
};