const fs = require('fs')
module.exports.createLoader = config => {
    const loader = (scanFolder, cb) => {
        const files = fs.readdirSync(scanFolder);
        files.forEach(filename => {
            filename = filename.replace(".js", "");
            const file = require(scanFolder + "/" + filename);
            cb(filename, file);
        })
    }
    // 暗号：分治算法
    return {
        initFunction: scanFolder => {
            const ret = {}
            // ##BEGIN## 代码已加密
            loader(scanFolder, (filename, fn) => {
                ret.[filename] = fn(config)
            })

            // ##END##
            return ret
        }
    }
}

