// This library allows us to combine paths easily
const path = require('path');
const webpack = require('webpack');
const glob = require("glob");

module.exports = {
    entry: [
        path.resolve(__dirname, 'src', 'app.js'),
        path.resolve(__dirname, 'src', 'index.html'),
        path.resolve(__dirname, 'src/gfx', 'charging_norway.png')
    ],
    output: {
        path: path.resolve(__dirname, 'output'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            styles: path.resolve(__dirname, 'src', 'styles')
        }
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(html)/,
                use: [{
                    loader: 'file-loader', options: {
                        name: '[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader', options: {
                        name: 'gfx/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['babili']
                }
            }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
            // In case you imported plugins individually, you must also require them here:
            Util: "exports-loader?Util!bootstrap/js/dist/util",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
        })
    ],

    devServer: {
        contentBase: './src',
        publicPath: '/output'
    }
};