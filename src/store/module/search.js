/**
 * 1、定义小store
 * 2、将小store汇总至总store，也可以叫是大store
 */

import { reqSearchGoods } from "@/api";

export default {
	// 大store怎样使用，小store就怎样使用，含有的配置项也是一样
	state: {
		searchGoods: {},
	},
	mutations: {
		UPDATE_SEARCHGOODS(state, searchGoods) {
			state.searchGoods = searchGoods;
		},
	},
	actions: {
		async getSearchGoods({ commit }, searchCondition) {
			const res = await reqSearchGoods(searchCondition);
			if (res.code === 200) {
				commit("UPDATE_SEARCHGOODS", res.data);
			}
		},
	},
	getters: {
		attrsList(state) {
			return state.searchGoods.attrsList || [];
		},
		goodsList(state) {
			return state.searchGoods.goodsList || [];
		},
		trademarkList(state) {
			return state.searchGoods.trademarkList || [];
		},
	},
};
