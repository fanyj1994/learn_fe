var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/script/main.js',
        a: './src/script/a.js',
        b: './src/script/b.js',
        c: './src/script/c.js'
    },//多文件多输出的打包方式
    output: {
        path: './dist',
        filename: 'js/[name].js',
        publicPath: 'https://cdn.com'//上线后的输出地址，也就是说，会调用https://cdn.com下面的js/[name].js
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            title: 'webpack is awesome!',
            date: new Date(),
            excludeChunks: ['b', 'c'],  //与chunks参数互补，是指注入除了b和c之外的chunks
            minify: {
                removeComments: true,
                collapseWhitespace: false    //打包时压缩选项，删除空格和注释
            }
        }),
        new htmlWebpackPlugin({
            template: 'index.html',
            filename: 'b.html',
            title: '我是B页面!',
            date: new Date(),
            chunks: ['b'],
            minify: {
                removeComments: true,
                collapseWhitespace: false    //打包时压缩选项，删除空格和注释
            }
        }), //多个页面输出，则多次调用即可
        new htmlWebpackPlugin({
            template: 'index.html',
            filename: 'c.html',
            title: '我是C页面!',
            date: new Date(),
            chunks: ['c'],//通过chunks参数分别指定渲染的模块
            minify: {
                removeComments: true,
                collapseWhitespace: false    //打包时压缩选项，删除空格和注释
            }
        })
    ]
}
