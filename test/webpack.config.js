const webpack = require('webpack');
var path = require("path");

module.exports = {
    entry: './test.js',
    output: {
        path: './',
        filename: "test.bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname , '/src'),
                exclude: /(node_modules|bower_components)/,
                loader: "babel",
                query: {
                    presets: ['es2015'],
                    plugins: ["babel-plugin-add-module-exports"]
                }
            },
            {
                test: /\.css$/, // Only .css files
                loader: 'style!css?sourceMap' // Run both loaders
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            },
            {test: /\.(png|jpg)$/,loader: 'url?limit=25000'},
          
        ]
    },
}