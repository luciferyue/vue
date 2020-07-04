import Vue from 'vue';
import Vuex from './vuex';

Vue.use(Vuex);

// 天王盖地虎
export default new Vuex.Store({
    state: {
        counter: 1,
        price: 20
    },
    mutations: {
        add(state) {
            state.counter++
        },
        minus(state) {
            state.counter--
        }
    },
    actions: {
        minus({
            commit
        }) {
            setTimeout(() => {
                commit('minus')
            }, 1000);
        }
    },
    getters: {
        total: state => {
            return state.counter * state.price;
        }
    }
})