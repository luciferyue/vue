export default function applyMiddleware(...middlewares) {
	return createStore => reducer => {
		const store = createStore(reducer);
		let dispatch = store.dispatch

		//todo 加强dispatch
		const midApi = {
			getState: store.getState,
			//为了防止多个中间件，dispatch相互影响
			dispatch: (action, ...args) => dispatch(action, ...args)
		}
		const middlewareChain = middlewares.map((middleware) => middleware(midApi));
		//加强dispatch
		dispatch = compose(...middlewareChain)(store.dispatch);
		return {
			...store,
			//返回加强的dispatch
			dispatch
		}
	}
}

function compose(...funcs) {
	if (funcs.length === 0) {
		return args => args;
	}
	if (funcs.length === 1) {
		return funcs[0];
	}
	return funcs.reduce((a, b) => (...args) => a(b(...args)));
}