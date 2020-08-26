const fs = require('fs');

function set(key, value) {
  fs.readFile('./d.json', (err, data) => {
    //判断是否为空
    const json = data ? JSON.parse(data) : {}
    json[key] = value;

    //写入到文件系统
    fs.writeFile('./d.json', JSON.stringify(json), err => {
      if (err) {
        console.log(err);
      }
      console.log('写入成功');
    })
  })
}

function get(key) {
  fs.readFile('./d.json', (err, data) => {
    const json = JSON.parse(data)
    console.log(json[key]);
  })
}

//通过命令行调用
const readline = require('readline');
// 创建实例
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('line', (input) => {
  //set a 1
  const [op, key, value] = input.split(' ');
  if (op === 'get') {
    get(key)
  } else if (op === 'set') {
    set(key, value)
  } else if (op === 'quit') {
    rl.close()
  } else {
    console.log('没有操作', op);
  }
})

rl.on('close', () => {
  process.exit(0)
})