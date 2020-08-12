import React from "./mreact/index";
import ReactDOM from "./mreact/react-dom";
import Component from "./mreact/Component";

// import React, { Component } from "react";
// import ReactDOM from "react-dom";
import "./index.css";

class ClassComponent extends Component {
	static defaultProps = {
		color: "pink"
	};
	render() {
		return (
			<div className="border">
				class组件-{this.props.name}
				<p className={this.props.color}>omg</p>
			</div>
		);
	}
}

function FunctionComponent(props) {
	return <div className="border">函数组件-{props.name}</div>;
}

const jsx = (
	<div className="border">
		<p>全栈</p>
		<a href="https://www.kaikeba.com/">开课吧</a>
		<ClassComponent name="class" />
		<FunctionComponent name="function" />
		{/* {[1, 2].map(item => (
			<div key={item} > {item}</div>
		))} */}
	</div>
);

ReactDOM.render(jsx, document.getElementById("root"));
// 文本节点
// html元素节点
// 类组件
// 函数组件
// 数组
// Fragment
// 补充：<></>与Fragment的区别
