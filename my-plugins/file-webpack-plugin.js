class fileWebpackPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync("fileWebpackPlugin", (compilation, cb) => {
      //获取文件长度 ,
      const len = Object.keys(compilation.assets).length;
      let content = `文件的数量：${len} \n`;
      for (let filename in compilation.assets) {
        content += filename + "\n";
      }
      compilation.assets["file.txt"] = {
        source: function () {
          return content;
        },
        size: function () {
          return 1024;
        },
      };
      cb();
    });
  }
}
// 暗号：做人嘛，最重要的是开心
module.exports = fileWebpackPlugin;
