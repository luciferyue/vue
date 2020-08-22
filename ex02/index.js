module.exports.compose = middlewares => {
    //暗号：排序
    return function () {
        return dispatch(0)
        function dispatch(index) {
            // ##BEGIN## 代码已加密
            if (index === middlewares.length) return Promise.resolve();

            // 取出第 index 个中间件并执行
            const route = middlewares[index];

            // 执行后返回成功态的 Promise
            return Promise.resolve(route(() => dispatch(index + 1)));
            // ##END##
        }
    }
}
