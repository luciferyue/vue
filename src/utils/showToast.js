import Toast from '../components/Toast.vue'

const TOAST = {
	install(Vue) {
		Vue.component('Toast', Toast)
		// 挂载全局
		Vue.prototype.$showToast = (text, duration, callBack) => {
			creatToast(text, duration, callBack)
		}

		function creatToast(text, duration, callBack) {
			const durations = duration || 2000; //展示时间默认处理
			const VueToast = Vue.extend({
				render(h) {
					let props = {
						text: text || "村长喊你来搬砖", //默认文案
						show: this.show //状态
					}
					return h('toast', {
						props
					})
				},
				data() {
					return {
						show: false
					}
				}
			})
			const newToast = new VueToast();
			let vm = newToast.$mount();
			let el = vm.$el;
			//注入body
			document.body.appendChild(el);
			//显示toast
			vm.show = true;
			//设置定时隐藏toast
			let timer = setTimeout(() => {
				clearTimeout(timer);
				vm.show = false;
				//隐藏后，立即销毁
				let timer2 = setTimeout(() => {
					clearTimeout(timer2);
					//从body中移除dom
					document.body.removeChild(el);
					newToast.$destroy();
					//回收资源
					vm = null
					callBack && (typeof callBack === 'function') && callBack()
				})
			}, durations)
		}
	}
}
export default TOAST