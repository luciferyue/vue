//将来和渲染器打交道
//创建vue实例

import { createApp } from "./main"

export default context => {
    const { app, router } = createApp(context);

    return new Promise((resolve, reject) => {
        // 跳转收盘地址
        router.push(context.url)
        resolve(app)
    })
}