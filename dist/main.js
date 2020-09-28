(function(modules){
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
        require('./src/index.js')
    })({"./src/index.js":{"dependencies":{"./a.js":"./src/a.js","./b.js":"./src/b.js"},"code":"\"use strict\";\n\nvar _a = require(\"./a.js\");\n\nvar _b = require(\"./b.js\");\n\n// 分析 入口模块的\n// 内容 ： 依赖模块（目的是模块的路径）\n// 内容 ： 借助babel 处理代码 生成 代码片段\nconsole.log(\"\".concat(_a.str, \" hello \").concat(_b.str2));"},"./src/a.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.str = void 0;\n// import { str2 } from \"./b.js\";\nvar str = \"yxb\"; // console.log(str2);\n\nexports.str = str;"},"./src/b.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.str2 = void 0;\n// import { str } from \"./a.js\";\nvar str2 = \"LUFF\"; // console.log(str);\n\nexports.str2 = str2;"}})