const path =require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const util = require('./util.js');

//const webpack = require('webpack');

module.exports={
    entry:{
        ...util.entrys
    },
    output:{
        filename: 'js/[name].[hash:7].js',
        path: path.resolve(__dirname, '../dist')
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserJSPlugin(),new OptimizeCSSAssetsPlugin({})],
    },
    module:{
        rules:[
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader:"babel-loader"
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'images/[name].[hash:7].[ext]',
                        },
                    },
                    
                ],
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        ...util.htmlPlugin,
        new MiniCssExtractPlugin({
            filename: './css/[name].[hash:7].css',
        }),
        new CleanWebpackPlugin()
    ],
    mode:"production"
}
