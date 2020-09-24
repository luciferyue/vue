const path = require("path");
const glob = require("glob");
const htmlWebpackPlugin = require("html-webpack-plugin");
//暗号：等价交换，炼金术不变的原则
module.exports.setMap = () => {
  const entry = {};
  const htmlWebpackPlugins = [];

  const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"));
  entryFiles.map((item, i) => {
    const newItem = item.match(/src\/(.*)\/index\.js$/);
    const name = newItem[1];
    entry[name] = item;

    htmlWebpackPlugins.push(
      new htmlWebpackPlugin({
        template: path.join(__dirname, `./src/${name}/index.html`),
        filename: `${name}.html`,
        chunks: [name],
      })
    );
  });
  return {
    entry,
    htmlWebpackPlugins,
  };
};
