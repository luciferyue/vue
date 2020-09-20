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
    ],
  },
  plugins: [
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
