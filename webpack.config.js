const webpack = require('webpack');
var path = require("path");
var  libraryName = 'walkThoughExecutor';
var outputFile = libraryName + '.js';

module.exports = {
    entry: './main.js',
    devtool: 'source-map',
  	output: {
    	path: __dirname + '/lib',
    	filename: outputFile,
    	library: libraryName,
    	libraryTarget: 'umd',
    	umdNamedDefine: true
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
            {test: /\.(png|jpg)$/,loader: 'url?limit=25000'},
           

        ] 
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    resolve: {
   		root: path.resolve('./src'),
    	extensions: ['', '.js']
  }
}