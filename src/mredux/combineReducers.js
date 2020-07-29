export default function combineReducers(reducers) {
	return function mergeReducers(state = {}, action) {
		let nextState = {};
		let changeState = false;
		for (let key in reducers) {
			const reducer = reducers[key];
			const preStateKey = state[key];
			nextState[key] = reducer(preStateKey, action)
			changeState = changeState || nextState[key] !== preStateKey
		}

		changeState = changeState || Object.keys(nextState).length !== Object.keys(state).length

		return changeState ? nextState : state
	}
}