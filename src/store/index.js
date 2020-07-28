// import { createStore } from "redux";
import { createStore } from "../mredux";
import reducerName from '../reducer';

const store = createStore(reducerName);
export default store