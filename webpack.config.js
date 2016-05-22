const webpack = require('webpack');
var path = require("path");

module.exports = {
    entry: './main.js',
    output: {
        path: path.join(__dirname , '/dist'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname , '/src'),
                exclude: /(node_modules|bower_components)/,
                loader: "babel",
                query: {
                    presets: ['es2015']
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
            {test: /\.(png|jpg)$/,loader: 'url?limit=25000'}

        ] 
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
}