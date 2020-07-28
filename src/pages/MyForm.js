import React, { Component } from 'react';
import createForm from '../compontents/my-rc-form';
// import Input from '../compontents/input';
import Input from "../compontents/Input";

const nameRules = {
	required: true, message: "请输入姓名",
	reg: /^[\u4E00-\u9FA5]+$/, regMsg: '请输入中文'
}
const passwordRules = {
	required: true, message: "请输入密码",
	reg: /^[0-9]+$/, regMsg: '输入格式错误'
}

@createForm
class MyForm extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	submit = () => {
		const { validateFields } = this.props.form;
		validateFields((err, val) => {
			if (err) {
				console.log('出错了', err, val)
			} else {
				console.log('提交成功')
			}
		})
	}
	render() {
		console.log(this.props)
		const { getFieldDecorator } = this.props.form;
		return (
			<>
				<h3 className="title">My Form(西撒哈拉)</h3>
				{getFieldDecorator("username", { rules: nameRules })(<Input placeholder="UserName" />)}
				{getFieldDecorator("passward", { rules: passwordRules })(<Input placeholder="passward" />)}
				<button onClick={this.submit}>提交</button>
			</>
		)
	}
}
export default MyForm
