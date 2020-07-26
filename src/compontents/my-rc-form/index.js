import React, { Component } from 'react';

export default function createForm(Cmp) {
	return class extends Component {
		constructor(props) {
			super(props)
			this.state = {};
			this.options = {};
		}
		getForm = () => {
			return {
				form: {
					getFieldDecorator: this.getFieldDecorator,
					setFieldsValue: this.setFieldsValue,
					getFieldsValue: this.getFieldsValue,
					validateFields: this.validateFields
				}
			}
		};

		getFieldDecorator = (field, option) => InputCmp => {
			this.options[field] = option;
			return React.cloneElement(InputCmp, {
				name: field,
				value: this.state[field] || "",
				onChange: this.handleChange
			})
		};

		handleChange = (evt) => {
			const { name, value } = evt.target
			this.setState({
				[name]: value
			})
		}

		validateFields = (callback) => {
			let err = []
			for (let field in this.options) {
				const { rules } = this.options[field];
				const value = this.state[field];

				//暗号：西撒哈拉
				if (rules && rules.required) {
					//判断是否为空
					if (value === undefined || value === "") {
						err.push({
							[field]: rules.message,
							value
						});
					} else {
						//不为空，正则校验
						if (rules.reg && !rules.reg.test(value)) {
							err.push({
								[field]: rules.regMsg,
								value
							});
						}
					}
				}
			}

			if (!err.length) {
				callback(false, this.state)
			} else {
				callback(err, this.state)
			}
		}

		setFieldsValue = (newState) => {
			this.setState(newState);
		}

		getFieldsValue = () => {
			return this.state;
		}
		render() {
			return <Cmp {...this.props} {...this.getForm()} />
		}
	}
}
