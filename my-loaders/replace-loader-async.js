// 函数 声明式函数，不能是箭头，必须有返回值
// 如何返回多值
module.exports = function (source) {
  console.log(this.query);
  // const result = source.replace("hello", this.query.name);
  //return
  // return result;

  //callback
  // this.callback(null, result);

  //异步
  const cb = this.async();
  setTimeout(() => {
    const result2 = source.replace("webpack", this.query.name);
    cb(null, result2);
  }, 200);
};
