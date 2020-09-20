// 函数 声明式函数，不能是箭头，必须有返回值
// 如何返回多值
module.exports = function (source) {
  console.log(this.query);
  const result = source.replace("hello", "你好");
  //return
  return result;
};
