# 什么是Webpack
webpack是一个在前端开发中负责模块管理和依赖的模块打包器，其通过静态分析通过一些规则和插件来生成相应的静态文件。
![webpack示意图](https://webpack.js.org/bf093af83ee5548ff10fef24927b7cd2.svg)

其打包方式有异步和同步两种方式，其通过包的依赖关系来解析生成依赖关系，这种关系可以通过CommonJS规范、AMD规范以及ES6的import/export来实现。

值得注意的是，webpack本身只能解析原生的JavaScript模块，对于其它模块（例如CSS等）可以通过许多Loader转换器进行转换。例如css-loader就可以解析CSS模块。

另外，webpack更强大的是其插件系统，提供例如html-webpack-plugin插件可以生成HTML页面，其生成时候的资源加载策略，看可以通过插件的配置来实现。

而这一切，在项目中主要通过[webpack.config.js](https://github.com/fanyj1994/learn-webpack/blob/master/webpack.config.js)配置文件来设置，在这个配置中，有以下的几个概念需要注意。

### entry
entry属性指的是在项目中进入模块依赖的入口点，也就是说，打包工作会在这里开始执行，在简单项目中，这可能会是单一文件，但是在一个较为复杂的项目中，有时候不是所有的模块都需要在入口处被加载，所以我们可以设置多个入口，如下：
```
entry: {
        main: './src/script/main.js',
        a: './src/script/a.js',
        b: './src/script/b.js',
        c: './src/script/c.js'
    },//多文件多输出的打包方式
    output: {
        path: './dist',
        filename: 'js/[name].js'    
        //[name]指的是entry中设置的key值，main,a,b,c，d等
    }
```

### output
output是指经过打包后的静态文件输出设置，可以通过output.path设置其输出路径，output.filename设置输出名称，filename可以通过entry中的chunkName以及hash值来设置相应的对应名称。也可以通过publicPath来设置上线后的资源路径。上面代码中的output就是针对多个入口分别输出入口文件。

### plugins
plugins属性很明显用于实例化已经导入的插件，一般通过new操作符来进行。并且可以多次实例化插件。例如如果自动化生成项目中的html页面，webpack自身就提供这样一个插件html-webpack-plugin，关于它的使用，只需要三步走，第一步通过npm命令下载：
```
$ npm install html-webpack-plugin --save-dev
```
然后在config文件中引入它：
```
var htmlWebpackPlugin = require('html-webpack-plugin');
```
引入完成后在plugins属性中实例化它，并设置相关的参数：
```
plugins: [
        new htmlWebpackPlugin({
            template: 'index.html', //模板文件
            filename: 'index.html', //生成文档的名字
            title: 'webpack is awesome!',   //生成文档title
            date: new Date(),   
            excludeChunks: ['b', 'c'],  //与chunks参数互补，是指注入除了b和c之外的模块
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
```


### Loaders
前面提到，Webpack自己只能够解析JS文件，而对于包括CoffeeJS，ES6，JSX写成的文件，webpack都不能直接转换，需要借助其它的转译工具，最常用的babel，当然第一步仍然需要通过npm来install babel-loader和coffee-loader，然后再配置文件的loader属性中加入它们。同理，CSS文件以及图片等资源，Webpack也无能为力，所以我们通过加载特定的loader来告诉Webpack该怎么对待这些文件。
```
module: {
    loaders: [
        { test: /\.coffee$/, loader: 'coffee-loader' },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
      } ,//针对ES6以及JSX文件
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // less文件的加载方式，用!链接多个loader
      { test: /\.css$/, loader: 'style-loader!css-loader' },//CSS文件的加载
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' } 
    ]
  }
```

另外，为了在引入文件时不需要加上特定的扩展名，我们需要通过设置resolve.extensions来告诉webpack自己进行查找。
```
resolve: {
    // 可以通过require('filename')直接查找，而不需要require('filename.js')等;
    extensions: ['', '.js', '.json', '.coffee'] 
  }
```

### 如何使webpack工作起来？
如果想把index.js编译成bundle.js，可以直接运行这个命令:
```
webpack index.js bundle.js
```

还可以通过`webpack --watch`来实时监控修改。

另外还可以通过webpack-dev-server来实现热加载，自动刷新，在开发过程中足够酸爽，效率提高何止一点半点。当然还是先要npm webpack-dev-server这个模块，然后通过下面这个命令就可以实时热加载预览了。
```
webpack-dev-server --inline --hot
```

总之，通过使用webpack，使得项目的开发过程变得有条理，效率高了~