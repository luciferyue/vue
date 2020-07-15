// 创建一个express实例
const express = require('express');
const app = express();

//导入vue
const Vue = require('vue');

// 创建渲染器 vue-server-renderer提供
const { createRenderer } = require('vue-server-renderer');

const renderer = createRenderer();

//路由:由express在管理
app.get('/', async (req, res) => {
	//构建渲染页面内容

	//问题1：没办法交互
	//问题2：同构开发问题
	const vm = new Vue({
		data() {
			return {
				name: "vue SSR"
			}
		},
		template: '<div>{{name}}</div>'
	})

	try {
		// 渲染:得到html字符串
		const html = await renderer.renderToString(vm);
		res.send(html)
	} catch{
		res.status(500).send('服务渲染错误')
	}

})

app.listen(3000)