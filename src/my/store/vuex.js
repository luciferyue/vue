let Yvue;

class Store {
    constructor(options) {
        this._mutations = options.mutations

        this._actions = options.actions;
        this.getters = options.getters;
        const store = this;
        const {
            commit,
            action
        } = store;

        this.commit = function boundCommit(type, payload) {
            return commit.call(store, type, payload)
        }
        this.action = function boundAction(type, payload) {
            return action.call(store, type, payload)
        }

        //缓存结果  天王盖地虎
        const computed = {}
        for (let key in this.getters) {
            //便利对象，并执行函数返回结果
            computed[key] = partial(this.getters[key], store);
            Object.defineProperty(store.getters, key, {
                get: () => store._vm[key],
                enumerable: true
            })
        }

        function partial(fn, arg) {
            return function () {
                return fn(arg.state)
            }
        }

        // 响应式的state
        this._vm = new Yvue({
            data: {
                $$state: options.state
            },
            computed
        })
    }

    get state() {
        return this._vm._data.$$state
    }

    set state(v) {
        console.error('请不要随意设置state');
    }

    commit(type, payload) {
        const entry = this._mutations[type];

        if (!entry) {
            console.error('unknown mutation type');
            return
        }

        entry(this.state, payload)
    }


    dispatch(type, payload) {
        const entry = this._actions[type]
        console.log(this._actions)

        if (!entry) {
            console.error('unknown action type');
            return
        }

        return entry(this, payload)
    }
}

function install(Vue) {
    Yvue = Vue;

    Yvue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}

export default {
    Store,
    install
}