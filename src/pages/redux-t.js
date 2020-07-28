import React, { Component } from 'react';
import store from "../store";

export default class MyRedux extends Component {
	componentDidMount() {
		store.subscribe(() => {
			this.forceUpdate()
		})
	}
	add = () => {
		store.dispatch({ type: 'ADD', payload: 1 });
	}
	render() {
		return (
			<>
				<h2>计算器</h2>
				<div>{store.getState()}</div>
				<button onClick={this.add}>add</button>
			</>
		)
	}
}
