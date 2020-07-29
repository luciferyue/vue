import React, { Component } from 'react';
import store from "../store";

export default class MyRedux extends Component {
	componentDidMount() {
		this.unsubscribr = store.subscribe(() => {
			this.forceUpdate()
		})
	}

	UNSAFE_componentWillMount() {
		this.unsubscribr && this.unsubscribr()
	}

	add = () => {
		store.dispatch({ type: 'ADD', payload: 1 });
	}

	asyAdd = () => {
		store.dispatch((dispatch, getState) => {
			setTimeout(() => {
				dispatch({ type: 'ADD', payload: 1 });
				console.log(getState());
			}, 1000)
		})
	}

	promiseMinus = () => {
		store.dispatch(
			Promise.resolve({
				type: 'MINUS', payload: 1
			})
		)
	}

	changeName = () => {
		store.dispatch({ type: 'CHANGE', payload: "暗号：毛里塔尼亚" });
	}

	render() {
		const { name, num } = store.getState()
		return (
			<>
				<h2>{name}</h2>
				<button onClick={this.changeName}>changeName</button>
				<div>{num}</div>
				<button onClick={this.add}>add</button>
				<button onClick={this.asyAdd}>asyAdd</button>
				<button onClick={this.promiseMinus}>promiseMinus</button>
			</>
		)
	}
}
