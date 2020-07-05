// 实现对象的响应式原理 Object.defineProperty()
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

    //new一个新的 Observer 类
    new Observer(obj);
}

//代理函数,将$data代理到Yvue的实例上
function proxy(vm) {
    Object.keys(vm.$data).forEach(key => {
        Object.defineProperty(vm, key, {
            get() {
                return vm.$data[key];
            },
            set(v) {
                vm.$data[key] = v;
            }
        })
    })
}

//创建自己的vue框架
class Yvue {
    constructor(options) {
        //保存传入的对象
        this.$options = options;

        //保存需要响应的数据
        this.$data = options.data;

        //调用observe，对data对象响应处理
        observe(this.$data)

        //代理操作，把实例代理（$data）到this下面
        proxy(this)
    }
}

//数据相应的类
class Observer {
    constructor(value) {
        //每一个响应对象，半生一个Observer实例
        this.value = value

        //判断value是obj还是数组(暂时只有对象)
        this.walk(value);
    }

    walk(obj) {
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key])
        })
    }

}