// 创建一个express实例
const express = require('express');
const app = express();

//导入vue
const Vue = require('vue');

// 创建渲染器 vue-server-renderer提供
const { createRenderer } = require('vue-server-renderer');

const renderer = createRenderer();

//导入路由
const Router = require('vue-router');
Vue.use(Router);

//路由
app.get('*', async (req, res) => {
	// 创建一个路由实例
	const router = new Router({
		routes: [
			{ path: "/", component: { template: '<div>测试路由</div>' } },
			{ path: "/detail", component: { template: '<div>detail</div>' } },
		]
	});

	//构建渲染页面内容
	const vm = new Vue({
		router,
		data() {
			return {
				name: "vue SSR"
			}
		},
		template: `
			<div>
				<router-link to="/">index</router-link>
				<router-link to="/detail">detail</router-link>
				<div>{{name}}</div>
				<router-view></router-view>
			</div>
			`
	})

	try {
		//路由跳转
		router.push(req.url)

		// 渲染:得到html字符串
		const html = await renderer.renderToString(vm);
		res.send(html)
	} catch{
		res.status(500).send('服务渲染错误')
	}
})

app.listen(4000, () => {
	console.log("成功");
})