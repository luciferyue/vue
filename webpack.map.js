const path = require("path");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { setMap } = require("./setMap");
const { entry, htmlWebpackPlugins } = setMap();

module.exports = {
  entry,
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
      {
        test: /\.woff2$/,
        use: "file-loader",
      },
    ],
  },
  // devtool: "source-map",
  plugins: [
    ...htmlWebpackPlugins,
    new CleanWebpackPlugin(),
    new miniCssExtractPlugin({
      filename: "css/index-[contenthash:7].css",
    }),
  ],
};
