const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  // 入口文件
  entry: {
    app: './src/index.js',
  }, 
  devtool: 'inline-source-map', // source-map用来追踪开发代码与打包结果之间的映射，以便于更好地追踪错误
  devServer: {
    contentBase: './dist', // dist文件夹作为服务器访问的文件夹
    hot: true
  },
  // 插件
  plugins: [
    new CleanWebpackPlugin(), // 清理打包的缓存
    new HtmlWebpackPlugin({ // 动态生成HTML模板
      title: '管理输出'
    }),
    new webpack.HotModuleReplacementPlugin() // 内置的模块热替换功能
  ],
  // 打包出口
  output: { 
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
};