const HtmlWebpackPlugin = require("html-webpack-plugin");
const { name } = require("./package");

module.exports = {
  entry: process.env.MODE === "multiple" ? "./multiple.js" : "./index.js",
  devtool: "source-map",
  devServer: {
    port: "7099",
    clientLogLevel: "warning",
    disableHostCheck: true,
    compress: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      "/api": {
        // target: 'http://10.100.32.220:7002/wams_api/',
        // target: "http://localhost:7002/wams_api/",
        target: "https://wams.ciicgat.tech/wams_api/",
        pathRewrite: { "^/api": "" },
        secure: false,
        changeOrigin: true,
      },
    },
    historyApiFallback: true,
    overlay: { warnings: false, errors: true },
  },
  output: {
    publicPath: "/",
  },
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-react-jsx"],
          },
        },
      },
      {
        test: /\.(le|c)ss$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template:
        process.env.MODE === "multiple" ? "./multiple.html" : "./index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
  ],
};
