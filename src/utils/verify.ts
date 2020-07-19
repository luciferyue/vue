export function verify(target: any, name: string, descriptor: any): void {
	const submit = descriptor.value;
	descriptor.value = function (el: any) {
		const { name, mobile } = this.info;

		let result: Boolean = true;
		if (!name.length) {
			// result = { state: false, msg: "" }
			result = false;
			this.info.msg = "请输入姓名";
		} else if (!(/^[\u4e00-\u9fa5]*$/.test(name))) {
			result = false;
			this.info.msg = "请输入中文字";
		} else if (!mobile.length) {
			result = false;
			this.info.msg = "请输入手机号";
		} else if (!(/^[1][3,4,5,7,8][0-9]{9}$/.test(mobile))) {
			result = false;
			this.info.msg = "请输入正确手机号";
		}
		submit.call(this, result);
	}
}