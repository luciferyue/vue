import React from "react";

class LifeCycle extends React.Component {
	componentDidMount() {
		this.props.onMount && this.props.onMount.call(this, this)
	}

	componentDidUpdate(prevProps) {
		if (this.props.onUpdate) this.props.onUpdate.call(this, this, prevProps);
	};

	componentWillUnmount = function componentWillUnmount() {
		this.props.onUnmount && this.props.onUnmount.call(this, this);
	};
	render() {
		return null
	}
}
export default LifeCycle