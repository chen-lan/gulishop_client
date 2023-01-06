import Vue from "vue";
import zh_CN from "vee-validate/dist/locale/zh_CN";
import VeeValidate, { Validator } from "vee-validate";
import { phoneReg, codeReg, pwdReg } from "@/utils/regex";

Vue.use(VeeValidate);
Validator.localize("zh_CN", zh_CN);

//手机号的验证规则
Validator.extend("phone_rule", {
	getMessage: field => "请输入合法的手机号码",
	validate: value => phoneReg.test(value), // 将值转化为布尔值，当表单输入时进行调用
});
//验证必要性的规则
Validator.extend("required", {
	//验证规则
	validate: value => {
		//value你输入的值
		return value;
	},
	//验证失败的回调
	getMessage: field => {
		return field + "必须输入！";
	},
});

//验证码的验证规则
Validator.extend("code_rule", {
	//验证规则
	validate: value => codeReg.test(value),
	//验证失败的回调
	getMessage: filed => "验证码必须为6位数字！",
});

//密码的验证规则
Validator.extend("pwd_rule", {
	//验证规则
	validate: value => pwdReg.test(value),
	//验证失败的回调
	getMessage: filed => "密码为6到21位英文、数字、下划线",
});

//重复密码的验证规则
Validator.extend("ispwd", {
	//验证规则
	validate: (value, args) => value === args[0],
	//验证失败的回调
	getMessage: filed => "重复密码必须和登录密码一致",
});

//协议规则
Validator.extend("isagree", {
	//验证规则
	validate: value => value,
	//验证失败的回调
	getMessage: filed => "协议必须同意！",
});
