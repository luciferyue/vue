export default function createStore(reducer) {
	let currentState = null;
	let currentListeners = [];
	function getState() {
		return currentState
	}
	function dispatch(action) {
		debugger
		currentState = reducer(currentState, action);
		currentListeners.forEach(listener => listener())
	}
	function subscribe(listener) {
		currentListeners.push(listener);
	}

	dispatch({ type: "REDUX/AA" })

	return {
		getState,
		dispatch,
		subscribe
	}
}