module.exports = {
  plugins: [
    require("autoprefixer")({
      //  同.browserslistrc 和package.json =>"browserslist": ["last 2 version",">1%"]
      //兼容浏览器最近两个版本
      //兼容试产占有率大于1%的浏览器（世界）
      // overrideBrowserslist: ["last 2 version", ">1%"],
    }),
  ],
};
