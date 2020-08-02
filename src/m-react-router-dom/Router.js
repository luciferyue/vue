import React, { Component } from 'react';
import { RouterContext } from "./Context"

export default class Router extends Component {
	static computeRootMatch(patchname) {
		return { path: '/', url: "/", params: {}, isExact: patchname === "/" }
	}
	constructor(props) {
		super(props);
		this.state = {
			location: props.history.location
		}
		// location 发生改变的回调
		this.unLisen = props.history.listen((location) => {
			this.setState({ location })
		})
	}
	componentWillUnmount() {
		this.unLisen && this.unLisen()
	}
	render() {
		return (
			<RouterContext.Provider
				value={
					{
						history: this.props.history,
						location: this.state.location,
						match: Router.computeRootMatch(this.state.location.pathname)
					}
				}
			>
				{this.props.children}
			</RouterContext.Provider>
		)
	}
}
