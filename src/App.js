import React from "react";
// import ContextPage from "./pages/ContextPage";
// import AntdFormPage from "./pages/AntdFormPage";
// import MyRCFieldForm from "./pages/MyRCFieldForm";
// import MyForm from './pages/MyForm';
import MyRedux from './pages/redux-t'

export default function App(props) {
	return (
		<>
			{/* <MyForm /> */}
			<MyRedux />
		</>
	);
}

// const array1 = [1, 2, 3, 4];
// const reducer = (accumulator, currentValue) => accumulator + currentValue;
// // function reducer(a, b) {
// // 	console.log(a, b);
// // 	return a + b
// // }
// // // 1 + 2 + 3 + 4
// console.log(array1.reduce(reducer));
// // expected output: 10

// console.log(array1.reduce(reducer, 5));
// // expected output: 15

// function f1(arg) {
// 	console.log("f1", arg);
// 	return arg;
// }
// function f2(arg) {
// 	console.log("f2", arg);
// 	return arg;
// }
// function f3(arg) {
// 	console.log("f3", arg);
// 	return arg;
// }

// let res = f1(f2(f3("omg")));

// let res = compose(f1, f2, f3)("omg");

// function compose(...funcs) {
// 	if (funcs.length === 0) {
// 		return args => args;
// 	}
// 	if (funcs.length === 1) {
// 		return funcs[0];
// 	}
// 	// return funcs.reduce((a, b) => (...args) => a(b(...args)));

// 	return funcs.reduce(function fn(a, b) {
// 		return function (...args) {
// 			var b1 = b(...args);
// 			console.log(b1);
// 			//第一次：a(b()) ===> 第二次a = a(b(c()))
// 			a(b1)
// 		}
// 	});
// }

// console.log("rees", res); //sy-log


// var a = 1;
// function applyMiddleware() {
// 	console.log("第一层", arguments);
// 	return function () {
// 		console.log("第二层", arguments);
// 		return function () {
// 			console.log("第三层", arguments);
// 		}
// 	};
// }

// function createStore(fn) {
// 	fn(2)(3)
// };

// createStore(applyMiddleware(a))
