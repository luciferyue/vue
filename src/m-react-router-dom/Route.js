import React, { Component } from 'react';
import { RouterContext } from './Context';
import matchPath from './matchPatch';

export default class Route extends Component {
	render() {
		return (
			<RouterContext.Consumer>
				{
					(context) => {
						const { location } = context.history;
						const { children, component, render, path, computedMatch } = this.props;
						const match = computedMatch ?
							computedMatch
							:
							path ?
								matchPath(location.pathname, this.props)
								:
								context.match;
						const props = {
							...context,
							match
						}
						//return match ? React.createElement(component, props) : null;

						//macth children component render null
						//不存在macth children(function) null 
						return <RouterContext.Provider value={props}>
							{
								match ?
									children ?
										typeof children === "function" ? children(props) : children
										:
										component ?
											React.createElement(component, props)
											:
											render ?
												render(props)
												:
												null
									:
									typeof children === "function" ? children(props) : null
							}
						</RouterContext.Provider>
					}
				}
			</RouterContext.Consumer>
		)
	}
}


// export default class Route extends Component {
// 	static contextType = RouterContext;
// 	render() {
// 		const { location } = this.context.history;
// 		const { children, component, render, path } = this.props;
// 		const match = path === location.pathname
// 		return match ? React.createElement(component) : null
// 	}
// }
