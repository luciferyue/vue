// 实现对象的响应式原理
//1.Object.defineProperty()

function defineReactive(obj, key, val) {
    //val 可能是对象 递归处理
    observe(val)

    Object.defineProperty(obj, key, {
        get() {
            console.log('get', val)
            //返回val
            return val
        },
        set(newVal) {
            if (newVal !== val) {
                console.log('set', newVal);
                observe(newVal) //如果传入的是对象，需要重新相应处理
                val = newVal
            }
        }
    })
}

//对象响应式处理
function observe(obj) {
    if (typeof obj !== "object" || obj === null) return;

    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
    })
}

//新加属性的时候，模拟set
function set(obj, key, val) {
    defineReactive(obj, key, val)
}


const obj = {
    foo: 'foo',
    bar: "bar",
    bars: {
        a: 1
    }
}
// defineReactive(obj, 'foo', 'foo');
observe(obj)
// obj.foo
// obj.foo = 'aaa'
// obj.bar
// obj.bars.a = 10
obj.bars = {
    a: 10
}
obj.bars.a = 100
// set(obj, "add", "add")
// obj.add