const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const path = require("path");
const { transformFromAst } = require("@babel/core");
module.exports = class webpack {
  constructor(options) {
    this.entry = options.entry;
    this.output = options.output;
    this.modules = {};
  }
  run() {
    const info = this.parse(this.entry);
    this.modules[info.entryFile] = {
      dependencies: info.dependencies,
      code: info.code,
    };
    this.getObj(info);

    //3: 代码生成
    this.file(this.modules);
  }

  //解决重复调用
  getObj(info) {
    const { dependencies } = info;
    if (!Object.keys(dependencies).length) return
    for (let k in dependencies) {
      //根据文件路径的唯一性，判断是否打包错
      if (!this.modules[dependencies[k]]) {
        const childInfo = this.parse(dependencies[k]);
        this.modules[childInfo.entryFile] = {
          dependencies: childInfo.dependencies,
          code: childInfo.code,
        };
        console.log(childInfo);
        this.getObj(childInfo)
      }
    }
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
