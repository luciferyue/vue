// const fs = require('fs');

// 同步读取
// const data = fs.readFileSync("./config.js");
// console.log(data, data.toString());

// 异步读取
// const data = fs.readFile('./config.js', (err, data) => {
//   if (err) throw err
//   console.log(data, data.toString());
// })

(async () => {
  const fs = require('fs');
  const { promisify } = require('util');
  const readFile = promisify(fs.readFile);
  const data = await readFile('./config.js')
  console.log(data, data.toString());
})()