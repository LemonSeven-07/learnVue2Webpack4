const path = require('path')    // 导入path模块，从node_modules中寻找
// vue-loader@15.*之后除了必须带有VueLoaderPlugin。将定义过的其它规则复制并应用到 .vue 文件里相应语言的块。
var VueLoaderPlugin = require('vue-loader/lib/plugin')
// 清除打包之后dist目录下的其他多余或者无用的代码
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 导入安装的html-webpack-plugin插件(将根目录下的index.html文件打包到dist文件中)
var HtmlWebpackPlugin = require('html-webpack-plugin')
// 将项目中的某单个文件或整个文件夹在打包的时候复制一份到打包后的文件夹中（即复制一份到dist目录下）。
const CopyWebpackPlugin = require('copy-webpack-plugin')
// monaco编辑器插件
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
// webpack自带模块可以引用内部自带插件
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',  // 入口文件配置
  // 出口文件配置项
  output: {
    // 输出的路径，webpack2起就规定必须是绝对路径
    path: path.join(__dirname, '..', 'dist'), //__dirname表示绝对路径
    // 输出文件名字
    // filename: 'bundle.js'
    // 2. 多入口无法对应一个固定的出口, 所以修改filename为[name]变量，意为以入口之名为出口之名
    filename: '[name].js',
    //出口文件dist的放置位置相对于根目录'./'
    // publicPath: './'
  },
  mode: 'development',
  module: {
    rules: [
      // vue文件处理
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // css文件处理
      {
        test: /\.css$/,
        //css-loader只负责将css文件进行加载,style-loader负责将样式添加到DOM中，使用多个loader时，是从右向左
        use: ['style-loader', 'css-loader'] // webpack底层调用这些包的顺序是从右到左
      },
      // less文件处理
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      // 解决办法：esModule: false  该项默认为true，改为false即可
      // esModule: true该配置项为图片打包后的默认路径，带default对象，
      // 默认为ture，在配置项里将此项改为false即可去掉多余的defalut对象，
      // url-loader处理图片
      {
        test: /\.(jpg|jpeg|svg|png|gif|bmp)$/,
        use: [{
          loader: 'url-loader',
          options: {
            // 当加载的图片小于limit时，会将图片编译成base64字符串形式,不需要单独的文件来存储；
            // 当加载的图片大于limit时，需要使用file-loader模块加载，需要文件来存储。
            limit: 8192,
            // 打包输出目录
            outputPath: 'static',
            esModule: false,
            // 打包输出图片名称
            name: 'img/[name][hash:4].[ext]' //hash:4自动生成的hash值截取4位，ext图片扩展名
          }
        }]
      },
      // url-loader处理字体
      {
        test: /\.(woff|woff2|eot|svg|ttf)$/,
        use: 'url-loader',
      },
      // 一般建议在.babelrc中配置
      // ES6语法转ES5语法
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
          // 单独在 .babelrc文件中配置
          // options: {
          //     presets: ['@babel/env'],
          //     plugins: ['@babel/plugin-proposal-class-properties']
          // }
        },
        // exclude排除，不转化node_modules|bower_components文件中的JS代码
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  plugins: [
    new MonacoWebpackPlugin(),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html', //打包后的文件名
      template: './src/index.html',  //模板html
      minify: false,  //是否对生成的html文件进行压缩
    }),
    // 使用该插件不能copy空文件夹，否则会报路径错误的问题
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '..', '/src/assets'),  //定义要拷贝的源目录，必填项
          to: 'assets'  //定义要拷贝到的目标目录，非必填，不填写则拷贝到打包的output输出地址中
        }
      ]
    }),
    new webpack.BannerPlugin('版权所有，翻版必究!')  //给打包的js文件加上版权注释信息
  ]
}