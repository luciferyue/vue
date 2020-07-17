import Vue from 'vue'
import App from './App.vue'
import vMessage from './utils/showToast';
// import router from './my/router';
// import store from "./my/store"
import router from './router';
import store from "./store"

Vue.use(vMessage)

Vue.config.productionTip = false

new Vue({
  // 设置router
  router,
  store,
  render: h => h(App),
}).$mount('#app')