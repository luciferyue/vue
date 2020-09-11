const fs = require('fs')
test('集成测试 生成代码文件', () => {
  //准备环境
  //删除文件夹
  fs.rmdirSync(__dirname + '/data/__test__', {
    recursive: true
  })
  const src = new (require('../index'))()
  src.genJestSource(__dirname + '/data')
})

test('测试代码生成', () => {
  const src = new (require('../index'));
  const ret = src.getTestSource('fun', 'class')
  console.log('getSourceName', ret);
  expect(ret).toBe(`
test('TEST fun',()=>{
  const fun = require('../class')
  const ret = fun()
  //expect(ret)
  // .toBe('test return')
})
    `)
})