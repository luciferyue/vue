let YVue;

//创建插件，实现install方法
class YVueRouter {
    constructor(options) {
        this.$options = options;

        const initial = window.location.hash.slice(1) || '/'
        YVue.util.defineReactive(this, 'current', initial)

        window.addEventListener('hashchange', this.onHashChange)
        window.addEventListener('load', this.onHashChange);

        this.routerMap = {};
        this.$options.routes.forEach((route) => {
            this.routerMap[route.path] = route;
        })
    }

    onHashChange = () => {
        this.current = window.location.hash.slice(1);
    }
}

YVueRouter.install = function (Vue) {
    YVue = Vue;

    YVue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                YVue.prototype.$router = this.$options.router;
            }
        }
    })

    YVue.component('router-link', {
        props: {
            to: {
                type: String,
                required: true
            }
        },
        render(h) {
            return h(
                'a', {
                    attrs: {
                        href: '#' + this.to
                    }
                },
                this.$slots.default
            )
        }
    })
    YVue.component('router-view', {
        render(h) {

            const {
                routerMap,
                current
            } = this.$router;

            const comp = routerMap[current] ? routerMap[current].component : null
            return h(comp)
        }
    })
}

export default YVueRouter