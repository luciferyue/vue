// 实现对象的响应式原理 Object.defineProperty()
function defineReactive(obj, key, val) {
    //val 可能是对象 递归处理
    observe(val);

    //每执行一次defineReactive，创建一个Dep实例小管家
    const dep = new Dep();

    Object.defineProperty(obj, key, {
        get() {
            // console.log('get', val)
            Dep.target && dep.addDep(Dep.target); //依赖收集

            //返回val
            return val;
        },
        set(newVal) {
            if (newVal !== val) {
                // console.log('set', newVal);
                observe(newVal) //如果传入的是对象，需要重新相应处理
                val = newVal

                //通知更新粗暴的方式，全员更新
                // watchers.forEach(w => w.update())

                //精确的是知道那个管家去更新
                dep.notify();
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
    Object.keys(vm.$methods).forEach(key => {
        Object.defineProperty(vm, key, {
            get() {
                return vm.$methods[key];
            },
            set(v) {
                // vm.$data[key] = v;
                console.log('禁止重置')
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
        this.$methods = options.methods;

        //调用observe，对data对象响应处理
        observe(this.$data)

        //代理操作，把实例代理（$data）到this下面
        proxy(this)

        //编译实例化
        new Complie(options.el, this);
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

    //对象响应式处理
    walk = (obj) => {
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key])
        })
    }

}

//编译过程
class Complie {
    //带入el,vm
    constructor(el, vm) {
        this.$vm = vm;
        this.$el = document.querySelector(el);

        //编译模板
        if (this.$el) {
            this.complie(this.$el)
        }
    }

    complie = (el) => {
        //递归遍历el,判断类型
        el.childNodes.forEach(node => {
            //判断类型
            if (this.isElement(node)) {
                // console.log('编译元素', node.nodeName);
                //编译元素节点
                this.complieElement(node);
            } else if (this.isInter(node)) {
                // console.log('编译插值表达式', node.textContent);
                //编译插值文本
                this.complieText(node)
            }

            //递归便利子元素
            if (node.childNodes) {
                this.complie(node)
            }
        })
    }

    //所有动态绑定，都需要创建更新函数，以及对应的watcher实例
    update = (node, exp, dir) => {
        //参数 node节点，exp动态表达式值，dir相关指令

        //初始化
        const fn = this[dir + 'Updater'];
        fn && fn(node, this.$vm[exp]);

        // 创建watcher
        new Watcher(this.$vm, exp, function (val) {
            fn && fn(node, val);
        })
    }

    //插值文本编译
    complieText = (node) => {
        //获取匹配的值
        // console.log(RegExp.$1) //isInter
        // node.textContent = this.$vm[RegExp.$1]
        this.update(node, RegExp.$1, 'text');
    }

    //dom元素编译
    complieElement = (node) => {
        const nodeAttres = node.attributes;
        // console.log(nodeAttres)
        Array.from(nodeAttres).forEach(arr => {
            // console.log(arr)
            const attrName = arr.name; //y-xx
            const exp = arr.value;

            //判断指令格式是否正确
            if (this.isDirective(attrName)) {
                const dir = attrName.substring(2) //截取指令name
                //执行指令
                this[dir] && this[dir](node, exp);
            } else if (attrName.startsWith("@")) {
                const dir = attrName.substring(1) //截取事件name
                //绑定事件
                this[dir] && this[dir](node, exp);
            }
        })
    }

    //点击事件
    click = (node, exp) => {
        //监听node事件，并绑定vm实例
        node.addEventListener("click", () => {
            this.$vm.$options.methods[exp].call(this.$vm, node)
        })
    }

    //文本的指令
    text = (node, exp) => {
        // node.textContent = this.$vm[exp];    //通过更新函数同意调用
        this.update(node, exp, 'text');
    }

    //html指令
    html = (node, exp) => {
        // node.innerHTML = this.$vm[exp];    //通过更新函数同意调用
        this.update(node, exp, 'html');
    }

    htmlUpdater = (node, value) => {
        node.innerHTML = value;
    }

    textUpdater = (node, value) => {
        node.textContent = value;
    }

    //元素判断
    isElement = (node) => {
        return node.nodeType === 1
    }

    //判断是否插值
    isInter = (node) => {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }

    //判断指令格式是否正确
    isDirective = (attrName) => {
        return attrName.indexOf('y-') === 0;
    }
}

//watcher观察者：
//小秘书，界面中一个依赖对应一个小秘书
// const watchers = [];
class Watcher {
    //vm实例，更新的key，update更新函数
    constructor(vm, key, updateFn) {
        this.vm = vm;
        this.key = key;
        this.updateFn = updateFn;

        // watchers.push(this) //这样写，就默认监听所有的

        //依赖收集，读一次数据，触发 defineReactive 里面的get()
        Dep.target = this; //给Dep类添加个静态属性，保存this实例
        this.vm[this.key] //读一下值，触发上面的get()
        Dep.target = null;
    }

    //管家调用
    update = () => {
        //传入当前最新的值给更新函数
        this.updateFn.call(this.vm, this.vm[this.key])
    }
}

//管家
class Dep {
    constructor() {
        this.deps = []
    }

    //依赖收集，收集所有的watcher
    addDep = (watcher) => {
        this.deps.push(watcher);
    }

    //通知方法，去更新
    notify = () => {
        this.deps.forEach(watcher => watcher.update())
    }
}