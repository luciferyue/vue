import React, { Component } from 'react'
import { RouterContext } from './Context';
import LifeCycle from "./Lifecycle";

export default class Redirect extends Component {
	render() {
		return (
			<RouterContext.Consumer>
				{
					context => {
						const { history } = context;
						const { to, push = false } = this.props;
						return <LifeCycle onMount={() => {
							push ? history.push(to) : history.replace(to);
						}} />
					}
				}
			</RouterContext.Consumer>
		)
	}
}
