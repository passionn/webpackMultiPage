var fs= require('fs');
var path =require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var pagePath=path.resolve(__dirname,'../src/');
var files=fs.readdirSync(pagePath);
var pages=files.filter((v)=>{
    return v.indexOf('.html')>0;
});
var htmlPlugin=[];
var htmlpage=[];
var entrys={};
pages.forEach((v)=>{
    if(v.indexOf('.html')>0){
        htmlpage.push(v);
    };
    htmlPlugin.push(
        new HtmlWebpackPlugin({
        filename: v,
        template: path.resolve(__dirname, '../src/'+v),
        chunks: [v.split('.')[0]]
    }));
});
var entryJs = fs.readdirSync(path.resolve(__dirname, '../src/js'));
entryJs.forEach((v)=>{
    var hasjs=htmlpage.find((n)=>{
        return n==v.split('.')[0]+'.html';
    });
    if(hasjs){
        entrys[v.split('.')[0]] = path.resolve(__dirname, '../src/js/'+v);
    }
});

module.exports={
    entrys,
    htmlPlugin
}


