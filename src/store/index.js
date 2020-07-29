// import { createStore, applyMiddleware, combineReducers } from "redux";
import { createStore, applyMiddleware, combineReducers } from "../mredux";
// import thunk from "redux-thunk";
// import logger from "redux-logger";
// import promise from "redux-promise";
import isPromise from "is-promise";
import { reducerNum, reducerName } from '../reducer';

const store = createStore(combineReducers({ num: reducerNum, name: reducerName }), applyMiddleware(thunk, promise, logger));
export default store;

// !next就是聚合函数 => store的dispatch(action)

function logger({ getState }) {
	return next => action => {
		console.log("*******************************");
		console.log(action.type + "执行了！");

		let prevState = getState();	//上一个
		console.log("prev state", prevState);

		const returnValue = next(action);
		let nextState = getState();
		console.log("next state", nextState);

		console.log("*******************************");
		return returnValue;
	};
}

function thunk({ dispatch, getState }) {
	return next => action => {
		if (typeof action === "function") {
			return action(dispatch, getState);
		}
		return next(action);
	};
}

function promise({ dispatch }) {
	return next => action => {
		return isPromise(action) ? action.then(dispatch) : next(action);
	};
}