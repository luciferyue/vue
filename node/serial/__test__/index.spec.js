// test('callback', done => {
//   const { callback } = require("../index");
//   callback()
//   // 延时1s结束 
//   setTimeout(done, 1000)
// })

// test('promise', done => {
//   const { promise } = require("../index");
//   promise()
//   // 延时1s结束 
//   setTimeout(done, 1000)
// })

// test('generator', done => {
//   const { generator } = require("../index");
//   generator()
//   // 延时1s结束 
//   setTimeout(done, 1000)
// })

// test('asyncAwait', done => {
//   const { asyncAwait } = require("../index");
//   asyncAwait()
//   // 延时1s结束 
//   setTimeout(done, 1000)
// })

test('event', done => {
  const { event } = require("../index");
  event()
  // 延时1s结束 
  setTimeout(done, 1000)
})