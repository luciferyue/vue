const fs = require('fs');
const rs = fs.createReadStream('./img/1.png');
const ws = fs.createWriteStream('./img/2.png');

//创建导管
rs.pipe(ws)