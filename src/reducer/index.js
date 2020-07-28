// const initialState = 0;

const reducerName = (state = 0, action) => {
	switch (action.type) {
		case "ADD":
			return state + 1
		case "MINUS":
			return state - 2
		default:
			return state
	}
}
export default reducerName;
