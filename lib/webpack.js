const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const path = require("path");
const { transformFromAst } = require("@babel/core");
module.exports = class webpack {
  constructor(options) {
    // console.log(options);
    this.entry = options.entry;
    this.output = options.output;
    this.modules = [];
  }
  run() {
    const info = this.parse(this.entry);
    this.modules.push(info);
    // console.log(info);
    //递归处理所有依赖
    for (let i = 0; i < this.modules.length; i++) {
      const { dependencies } = this.modules[i];
      if (dependencies) {
        for (let k in dependencies) {
          this.modules.push(this.parse(dependencies[k]));
        }
      }
    }
    // console.log(this.modules);
    // 修改数据结构 数组转对象
    const obj = {};
    this.modules.forEach((item) => {
      obj[item.entryFile] = {
        dependencies: item.dependencies,
        code: item.code,
      };
    });
    // console.log(obj);

    //3: 代码生成
    this.file(obj);
  }

  parse(entryFile) {
    //如何读取模块的内容
    const content = fs.readFileSync(entryFile, "utf-8");
    const ast = parser.parse(content, {
      sourceType: "module",
    });
    const dependencies = {};
    //过滤
    traverse(ast, {
      ImportDeclaration({ node }) {
        // console.log(`-------------`, node.source.value);
        const value = node.source.value;
        // console.log(path.resolve(__dirname, "../"));
        const newPath = "./" + path.join(
          path.dirname(entryFile), // 返回./src/
          value
        )
        // console.log(newPath);
        dependencies[value] = newPath;
      }
    })
    // console.log("过滤后", dependencies);
    //解析代码
    const { code } = transformFromAst(ast, null, {
      presets: ["@babel/preset-env"]
    })
    // console.log(code);

    return {
      entryFile,
      dependencies,
      code
    }
  }

  file(code) {
    const filePath = path.join(this.output.path, this.output.filename);
    // console.log(filePath);
    const newCode = JSON.stringify(code);
    // 生成 bundle代码，传入newCode，补全require
    const bundle = `(function(modules){
        function require(module){
            function newRequire(relativePath){
              return require(modules[module].dependencies[relativePath])
            }    
            var exports = {};
            (function(require,exports,code){
                eval(code)
            })(newRequire,exports,modules[module].code)
            return exports;
        }
        require('${this.entry}')
    })(${newCode})`;

    //写入
    fs.writeFileSync(filePath, bundle, "utf-8");
  }
};
