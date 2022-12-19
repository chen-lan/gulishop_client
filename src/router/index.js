import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";

Vue.use(VueRouter);

// 改造vue-router的方法，让其具有处理第二点击提交相同的内容报错问题
let originPush = VueRouter.prototype.push; //是函数，并非调用

VueRouter.prototype.push = function (option, resolve, reject) {
	if (resolve === undefined && reject === undefined) {
		// 如果两个回调函数都不传，则进行处理报错
		return originPush.call(this, option).catch(() => {});
	} else {
		return originPush.call(this, option, resolve, reject);
	}
};

export default new VueRouter({
	routes: [
		{
			path: "/home",
			component: Home,
		},
		{
			path: "/login",
			component: Login,
		},
		{
			path: "/register",
			component: Register,
		},
		{
			path: "/search/:keyword?",
			component: Search,
			name: "search",
			props(route) {
				return {
					keyword: route.params.keyword,
					keyword1: route.query.keyword1,
				};
			},
		},
		{
			path: "/",
			redirect: "/home",
		},
	],
});
