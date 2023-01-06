import { v4 } from "uuid"; // v4是一个函数，返回值是一个唯一标识的字符串
import store from "@/store";

export function getUserTempId() {
	let userTempId = localStorage.getItem("userTempId");
	// 如果是第一次进来，则会获取唯一标识值
	if (!userTempId) {
		userTempId = v4();
		localStorage.setItem("userTempId", userTempId);
		return userTempId;
	}
	return userTempId;
}
export function setToken(token) {
	localStorage.setItem("token", token);
}
export function getToken() {
	return localStorage.getItem("token");
}
// 获取用户登录信息
export async function getUserInfo() {
	try {
		await store.dispatch("getUserInfo");
		return "ok";
	} catch (error) {
		alert("获取用户信息失败");
		return Promise.reject("fail");
	}
}
