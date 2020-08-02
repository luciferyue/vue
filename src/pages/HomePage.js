import React, { Component } from "react";
// import { Redirect } from "../m-react-router-dom";

export default class HomePage extends Component {
	// constructor(props) {
	// 	super(props)
	// 	console.log("这是home组件");
	// }
	// componentDidMount() {
	// 	console.log("这是home组件");
	// }
	render() {
		console.log("props", this.props); //sy-log
		// return (
		// 	<Redirect
		// 		to={{
		// 			pathname: "/welcome"
		// 		}}
		// 	/>
		// );
		return (
			<div>
				<h3>HomePage</h3>
			</div>
		);
	}
}
