// 分析 入口模块的
// 内容 ： 依赖模块（目的是模块的路径）
// 内容 ： 借助babel 处理代码 生成 代码片段
import { str } from "./a.js";
import { str2 } from "./b.js";
console.log(`${str} hello ${str2}`);