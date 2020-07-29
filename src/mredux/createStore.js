export default function createStore(reducer, enhancer) {
	if (enhancer) {
		// 原版dispatch只能接受普通对象，加强之后变强大，可以处理多种形式，如callback、promise等
		// 加强，传入createStore，返回reducer
		return enhancer(createStore)(reducer)
	}
	let currentState;
	let currentListeners = [];
	function getState() {
		return currentState
	}
	function dispatch(action) {
		currentState = reducer(currentState, action);
		currentListeners.forEach(listener => listener())
	}
	function subscribe(listener) {
		currentListeners.push(listener);

		return () => {
			currentListeners = []
		}
	}

	dispatch({ type: "" })

	return {
		getState,
		dispatch,
		subscribe
	}
}