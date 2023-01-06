/**
 * 1、下载Vuex，并声明
 * 2、使用Vuex,Vue.use(Vuex)
 * 3、创建Vuex.store
 */
import Vue from "vue";
import Vuex from "vuex";
import home from "@/store/module/home";
import user from "@/store/module/user";
import search from "@/store/module/search";
import detail from "@/store/module/detail";
import shopCart from "@/store/module/shopCart";
import trade from "@/store/module/trade";

Vue.use(Vuex);

const state = {
	// msg: "我好像感染了新冠病毒",
};
const mutations = {};
const actions = {};
const getters = {};
const modules = {
	home,
	user,
	search,
	detail,
	shopCart,
	trade,
};

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters,
	modules,
});
