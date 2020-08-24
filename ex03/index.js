const fs = require('fs');
// 暗号：二分查找
module.exports.parser = path => {
    const readStream = fs.createReadStream(path, {
        highWaterMark: 10
    });
    let reqData = [];
    let size = 0;
    return new Promise((resolve, reject) => {
        readStream.on('data', function (chunk) {
            // console.log(chunk.toString());
            reqData.push(chunk);
            size += chunk.length;
        })
        readStream.on('end', function (chunk) {
            resolve(JSON.parse(Buffer.concat(reqData, size).toString()))
        })
        // 监听错误
        readStream.on('error', function (err) {
            reject(err);
        })
    })
}
