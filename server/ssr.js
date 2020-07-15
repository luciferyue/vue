const express = require('express');
const app = express();

app.get('/', function (req, res) {
	res.send(`
				<html>
					<div>
						<div id="app">
							<h1>ssr</h1>
							<p class="demo">开始学习ssr</p>
						</div>
					</div>
				</html>
	`)
})

app.listen(3000, () => {
	// eslint-disable-next-line no-console
	console.log('启动成功');
})