const { EventEmitter } = require('events')
module.exports = class Connection {
    constructor(conf) {
        this.event = new EventEmitter();
    }
    //暗号夏老师：冒泡排序；助教：搜索算法
    onConn = (event) => {
        this.event.on('event', event)
    }

    connection = (str) => {
        this.event.emit('event', str);
    }
}

// const event = new EventEmitter();
// event.on('some_event', nums => {
//     console.log('订阅回调' + nums);
// })
// let num = 0;

// setTimeout(() => {
//     event.emit('some_event', '连接1完成')
// }, 1000)

// setTimeout(() => {
//     event.emit('some_event', '连接2完成')
// }, 1000)
