import React from 'react';
import { RouterContext } from './Context';

const withRouter = WrappedCompoment => props => {
	return (
		<RouterContext.Consumer>
			{
				context => {
					return <WrappedCompoment {...props} {...context} />;
				}
			}
		</RouterContext.Consumer>
	)
}
export default withRouter;
