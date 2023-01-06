/**
 * 1、定义小store
 * 2、将小store汇总至总store，也可以叫是大store
 */

import { reqGetUserInfo, reqRegisterCode, reqRegisterUser, reqUserLogin, reqUserLogout } from "@/api";
import { getToken, setToken } from "@/utils/user";

export default {
	// 大store怎样使用，小store就怎样使用，含有的配置项也是一样
	state: {
		code: "",
		token: getToken(),
		userInfo: {},
	},
	mutations: {
		UPDATE_CODE(state, code) {
			state.code = code;
		},
		UPDATE_TOKEN(state, token) {
			state.token = token;
		},
		UPDATE_USERINFO(state, userInfo) {
			state.userInfo = userInfo;
		},
	},
	actions: {
		// 获取注册验证码
		async getRegisterCode({ commit }, phone) {
			const res = await reqRegisterCode(phone);
			if (res.code === 200) {
				commit("UPDATE_CODE", res.data);
				return "ok";
			} else {
				return Promise.reject("fail");
			}
		},
		// 注册用户
		async registerUser({ commit }, registerUserInfo) {
			const res = await reqRegisterUser(registerUserInfo);
			if (res.code === 200) {
				return "ok";
			} else {
				return Promise.reject("fail");
			}
		},
		async userLogin({ commit }, userLoginInfo) {
			const res = await reqUserLogin(userLoginInfo);
			if (res.code === 200) {
				commit("UPDATE_TOKEN", res.data.token);
				setToken(res.data.token);
				return "ok";
			} else {
				return "fail";
			}
		},
		// 根据token获取用户信息
		async getUserInfo({ commit }) {
			const res = await reqGetUserInfo();
			if (res.code === 200) {
				commit("UPDATE_USERINFO", res.data);
				return "ok";
			} else {
				return Promise.reject("fail");
			}
		},
		// 退出登录
		async userLogout({ commit }) {
			const res = await reqUserLogout();
			if (res.code === 200) {
				return "ok";
			} else {
				return Promise.reject("fail");
			}
		},
	},
	getters: {
		//
	},
};
