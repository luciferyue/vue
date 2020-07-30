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

		validateFields = (cb) => {
			let err = [];
			for (let field in this.options) {
				const { rules } = this.options[field];
				const value = this.state[field];

				//暗号：西撒哈拉
				//先看是否有值
				if (value === undefined || value === "") {
					//如果为空，且是必填选项
					if (rules && rules.required) {
						err.push({
							[field]: rules.message,
							value
						});
					}
				} else {
					//不为空，有正则，则正则校验
					if (rules.reg && !rules.reg.test(value)) {
						err.push({
							[field]: rules.regMsg,
							value
						});
					}
				}
			}

			if (!err.length) {
				cb(false, this.state)
			} else {
				cb(err, this.state)
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
