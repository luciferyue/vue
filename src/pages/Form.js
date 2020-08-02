import React, { Component } from 'react';
import { Prompt } from "../m-react-router-dom";
// import { Prompt } from "react-router-dom/";

export default class Form extends Component {
	constructor(props) {
		super(props)
		this.state = { comfirm: true, msg: "确认要离开么？" }
	}
	componentDidMount() {
		console.log("这是Form组件");
	}
	render() {
		const { msg, comfirm } = this.state;
		return (
			<div>
				离开路由有提示
				<Prompt when={comfirm} message={msg} />
				<button onClick={() => this.setState({ comfirm: false })}>改变confirm</button>
				<button onClick={() => this.setState({ msg: '暗号 尼日尔' })}>改变message</button>
			</div>
		)
	}
}
