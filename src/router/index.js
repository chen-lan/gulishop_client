import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/router/routes";
import store from "@/store";

import { getUserInfo } from "@/utils/user";
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

const router = new VueRouter({
	routes,
	scrollBehavior() {
		return { y: 0 };
	},
});

// 路由全局守卫，当路由发生变化，就会执行该函数
router.beforeEach(async (to, from, next) => {
	// console.log("to", to);
	// console.log("from", from);
	// 获取token和userInfo的用户信息
	const token = store.state.user.token;
	// 有token值，说明已经登录了
	if (token) {
		// 已登录和刷新丢失userInfo数据时，重新获取用户登录信息
		try {
			await getUserInfo();
			next();
		} catch (error) {
			localStorage.removeItem("token");
			store.state.user.token = "";
			if (
				to.path.indexOf("/trade") !== -1 ||
				to.path.indexOf("/pay") !== -1 ||
				to.path.indexOf("/center") !== -1 ||
				to.path.indexOf("/home") !== -1
			) {
				next(`/login?wantpath=${to.path}`);
			}
		}
		// if (Object.keys(userInfo).length === 0) {
		// 	console.log(1111);
		// } else {
		// 	console.log(2222);
		// }
	} else {
		// 未登录状态
		if (to.path.indexOf("/trade") !== -1 || to.path.indexOf("/pay") !== -1 || to.path.indexOf("/center") !== -1) {
			next(`/login?wantpath=${to.path}`);
		} else {
			next();
		}
	}
});

export default router;
