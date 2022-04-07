// 导入安装的uglifyjs-webpack-plugin插件(丑化dist文件下的js代码，去掉空格和注释等，缩小js代码占用的大小)
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')

// 合并配置文件的模块
const webpackMerge = require('webpack-merge')

// 导入公共配置
const webpackBaseConfig = require('./webpack.base.config.js')

module.exports = webpackMerge.merge(webpackBaseConfig, {
  // 插件配置
  plugins: [
    new UglifyjsWebpackPlugin()
  ],
})