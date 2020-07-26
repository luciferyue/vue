import React from "react";

const Input = props => {
	return <input {...props} />;
};

// const CustomizeInput = ({value = "", ...props}) => (
//   <div style={{padding: 10}}>
//     <Input style={{outline: "none"}} value={value} {...props} />
//   </div>
// );

class CustomizeInput extends React.Component {
	render() {
		const { value = "", ...otherProps } = this.props;
		return (
			<div style={{ padding: 10 }}>
				<Input style={{ outline: "none" }} value={value} {...otherProps} />
			</div>
		);
	}
}

export default CustomizeInput;
