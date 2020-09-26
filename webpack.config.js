const path = require("path");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const fileWebpackPlugin = require("./my-plugins/file-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  // entry: { index: "./src/index.js", login: "./src/login.js" },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name]-[chunkhash:7].js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          miniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      // {
      //   test: /\.(png|jpe?g|gif)$/,
      //   use: {
      //     loader: "file-loader",
      //     options: {
      //       name: "[hash:6][name].[ext]",
      //       outputPath: "img",
      //     },
      //   },
      // },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[hash:6][name].[ext]",
            outputPath: "img",
            limit: 2048, //官网推荐
          },
        },
      },
      // {
      //   test: /\.woff2$/,
      //   use: "file-loader",
      // },
    ],
  },
  // devServer: {
  //   contentBase: "./dist",
  //   open: true,
  //   port: 8081,
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:8079/",
  //     },
  //   },
  // },
  //source-map 映射 , inline-source-map打在一起，比较大
  devtool: "source-map",
  plugins: [
    new fileWebpackPlugin(),
    new htmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["main"],
    }),
    // new htmlWebpackPlugin({
    //   template: "./src/index.html",
    //   filename: "login.html",
    //   chunks: ["login"],
    // }),
    new CleanWebpackPlugin(),
    new miniCssExtractPlugin({
      filename: "css/index-[contenthash:7].css",
    }),
  ],
};
