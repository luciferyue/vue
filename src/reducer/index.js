const initialState = 0;

const reducerNum = (state = initialState, action) => {
	switch (action.type) {
		case "ADD":
			return state + 1
		case "MINUS":
			return state - 1
		default:
			return state
	}
}

const reducerName = (state = "计算器", action) => {
	switch (action.type) {
		case "CHANGE":
			return action.payload
		default:
			return state
	}
}
export {
	reducerNum,
	reducerName
};
