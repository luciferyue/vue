const path = require("path");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
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
        test: /\.less$/,
        use: [
          // miniCssExtractPlugin.loader,
          "yxb-style-loader",
          "yxb-css-loader",
          "yxb-less-loader",
        ],
      },
      {
        test: /\.js$/,
        use: [
          "replace-loader",
          {
            loader: "replace-loader-async",
            options: {
              name: "yxb",
            },
          },
        ],
      },
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
    ],
  },
  resolveLoader: {
    modules: ["node_modules", "./my-loaders"],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["main"],
    }),
    new CleanWebpackPlugin(),
    new miniCssExtractPlugin({
      filename: "css/index-[contenthash:7].css",
    }),
  ],
};
