import React, { Component } from 'react'
import { RouterContext } from './Context';

export default class Link extends Component {
	static contextType = RouterContext
	handleClick = (e) => {
		e.preventDefault();
		// window.history.pushState()
		// if (this.context.history.location.pathname !== this.props.to)
		this.context.history.push(this.props.to)
	}
	render() {
		const { to, children, ...restProps } = this.props;
		return (
			<a href={to} {...restProps} onClick={this.handleClick}>{children}</a>
		)
	}
}
