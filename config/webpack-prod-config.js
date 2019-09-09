// webpack-prod-config.js

// contains configuration data related to prod build

const path = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = require('./paths');
const common = require('./webpack-common-config.js');

module.exports = merge(common, {
    entry: {
        // Split vendor code into separate bundles
        vendor: ['react'],
        app: paths.appIndexJs,
    },
    mode: 'production',
    output: {
        filename: '[name].js',
        path: paths.appBuild,
        //publicPath: '/',
    },
    plugins: [
        // Extract text/(s)css from a bundle, or bundles, into a separate file.
        new ExtractTextPlugin('styles.css'),
    ],
    module: {
        rules: [
            {
                // look for .js or .jsx files
                test: /\.(js|jsx)$/,
                // in the `src` directory
                include: path.resolve(paths.appSrc),
                exclude: /node_modules/,
                use: {
                    // use babel for transpiling JavaScript files
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/react'],
                    },
                },
            },
            {
                // look for .css or .scss files.
                test: /\.(css|scss)$/,
                // in the `src` directory
                include: [path.resolve(paths.appSrc)],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: false,
                                // This enables local scoped CSS based in CSS Modules spec
                                modules: false,
                            },
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                }),
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
});
