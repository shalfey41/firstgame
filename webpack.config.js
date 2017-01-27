/* eslint-disable global-require, strict */

'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

const ENV = { PROD: 'production', DEV: 'dev' };
const NODE_ENV = process.env.NODE_ENV || ENV.DEV;
const FRONTEND_PATH = path.join(__dirname, 'frontend');

module.exports = {
    context: FRONTEND_PATH,

    entry: {
        sofia: './sofia',
    },

    output: {
        path: path.join(__dirname, 'html', 'public'),
        publicPath: '/public/',
        filename: '[name].js',
        chunkFilename: path.join(
            'chunks',
            '[id]',
            `[${NODE_ENV === ENV.PROD ? 'chunkhash' : 'name'}].js`
        ),
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
            },
            {
                test: /\.json$/,
                loader: 'json',
            },
            {
                test: /\.(less|css)$/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    'css!postcss!less?resolve url'
                ),
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loaders: [
                    'file?name=[path][name].[ext]',
                    'image-webpack',
                ],
            },
            {
                test: /\.(ttf|woff|woff2)$/,
                loader: 'file?name=[path][name].[ext]',
            },
            {
                test: /\.(mp3)$/,
                loader: 'file?name=[path][name].[ext]',
            },
        ],
    },

    imageWebpackLoader: {
        mozjpeg: {
            quality: 70,
        },

        pngquant: {
            quality: '70-90',
            speed: 4,
        },

        svgo: {
            plugins: [
                { removeViewBox: false, },
                { removeEmptyAttrs: false, },
            ],
        },
    },

    postcss: () => ([
        autoprefixer({ browsers: ['last 2 versions'] }),
    ]),

    resolve: {
        extensions: [
            '',
            '.html',
            '.css', '.less',
            '.js', '.jsx',
        ],
    },

    plugins: [
        // чтобы в случае ошибки компиляции
        // не записывался битый файл
        new webpack.NoErrorsPlugin(),

        // эти переменные будут доступны в коде
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            LANG: JSON.stringify('ru'),
        }),

        // ищет повторяющийся код и
        // пакует его в common.(js|css)
        // Доваить если появится вторая строчка
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
        }),

        // эти модули подгрузятся,
        // если в коде будет их упоминание
        new webpack.ProvidePlugin({
            Promise: 'exports?global.Promise!es6-promise',
            fetch: 'exports?self.fetch!whatwg-fetch',
        }),

        new ExtractTextPlugin('css/[name].css', { allChunks: true }),

        // очистить папку с результатами сборки
        // перед запуском текущей
        new CleanWebpackPlugin(['public'], {
            root: path.join(__dirname, 'html'),
            verbose: true,
        }),

        // копирует файлы, наверное
        // new CopyWebpackPlugin([
        //     {
        //         from: path.join('personal', 'plugins', 'ckeditor', '**', '*'),
        //         toType: 'dir',
        //         force: false,
        //     },
        // ]),
    ],

    watch: NODE_ENV === ENV.DEV,

    devtool: NODE_ENV === ENV.DEV ? 'cheap-inline-module-source-map' : null,
};

// кроссплатформенное ситемное уведомление о статусе компиляции
const WebpackNotifierPlugin = require('webpack-notifier');
const webpackNotifierPlugin = new WebpackNotifierPlugin({
    title: 'Bezugly boilerplate',
    contentImage: path.join(__dirname, 'favicon.ico'),
});

module.exports.plugins.push(webpackNotifierPlugin);

if (NODE_ENV === ENV.PROD) {
    const UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
        compress: {
            drop_console: true,
            warnings: false,
        },
    });

    module.exports.plugins.push(UglifyJsPlugin);
}