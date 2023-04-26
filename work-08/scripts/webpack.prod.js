const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
  // 模式
  mode: "production",
  // 输入
  entry: {
    index:"./src/scripts/index.ts",
    put: "./src/scripts/put.ts",
    open: "./src/scripts/open.ts",
  },
  // 输出
  output: {
    // 输出的文件名格式，这里采用名字+内容hash片段的方式，用于清理缓存
    filename: "scripts/[name].[contenthash:5].js",
    // 输出路径
    path: path.resolve(__dirname, "../dist"),
    clean: true, // 自动将上次打包目录资源清空
  },
  resolve: {
    // 支持的脚本后缀，可以让我们导入时省略
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /.ts$/,
        use: [
          "ts-loader"
        ]
      },
      // 对于图片资源的处理
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
      },
    ]
  },
  plugins: [
    // 可以将引入的样式合并输出到css文件
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash:5].css"
    }),
    // 根据模板生成html文件
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/pages/index.html",
      chunks: ["index"]
    }),
    new HtmlWebpackPlugin({
      filename: "put.html",
      template: "./src/pages/put.html",
      chunks: ["put"]
    }),
    new HtmlWebpackPlugin({
      filename: "open.html",
      template: "./src/pages/open.html",
      chunks: ["open"]
    }),
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
    }),
    new CssMinimizerPlugin(),
  ]
}