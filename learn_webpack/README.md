# 什么是Webpack
webpack是一个在前端开发中负责模块管理和依赖的模块打包器，其通过静态分析通过一些规则和插件来生成相应的静态文件。
![webpack示意图](https://webpack.js.org/bf093af83ee5548ff10fef24927b7cd2.svg)

其打包方式有异步和同步两种方式，其通过包的依赖关系来解析生成依赖关系，这种关系可以通过CommonJS规范、AMD规范以及ES6的import/export来实现。

值得注意的是，webpack本身只能解析原生的JavaScript模块，对于其它模块（例如CSS等）可以通过许多Loader转换器进行转换。例如css-loader就可以解析CSS模块。

另外，webpack更强大的是其插件系统，提供例如html-webpack-plugin插件可以生成HTML页面，其生成时候的资源加载策略，看可以通过插件的配置来实现。

而这一切，在项目中主要通过[webpack.config.js](https://github.com/fanyj1994/learn-webpack/blob/master/webpack.config.js)配置文件来设置，在这个配置中，有以下的几个概念需要注意。

### entry
entry属性指的是在项目中进入模块依赖的入口点，也就是说，打包工作会在这里开始执行，在简单项目中，这可能会是单一文件，但是在一个较为复杂的项目中，可能通过设置多个chunks来设置多个入口。

### output
output是指经过打包后的静态文件输出设置，可以通过output.path设置其输出路径，output.filename设置输出名称，filename可以通过entry中的chunkName以及hash值来设置相应的对应名称。也可以通过publicPath来设置上线后的资源路径。

### plugins
plugins属性很明显用于实例化已经导入的插件，一般通过new操作符来进行。并且可以多次实例化插件。
