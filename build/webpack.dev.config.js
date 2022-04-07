// 合并配置文件的模块
const webpackMerge = require('webpack-merge')

// 导入公共配置
const webpackBaseConfig = require('./webpack.base.config.js')

module.exports = webpackMerge.merge(webpackBaseConfig, {
  // 搭建本地服务器配置(属于开发时依赖，不会打包进dist文件中)
  devServer: {   //该配置会被webpack-dev-server使用，并从不同方面做定制。
    // open: true,  //自动开启浏览器
    // publicPath: "/",
    // contentBase: "./dist",
    // webpack的一个功能，可以使代码修改后不用刷新页面就自动更新，提升开发效率
    hot: true,  //是否开启热模块更新
    port: 8080, //提供访问端口
    compress: true //是否启用gzip压缩
  }
})