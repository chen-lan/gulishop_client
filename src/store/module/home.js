/**
 * 1、定义小store
 * 2、将小store汇总至总store，也可以叫是大store
 */

import { reqBannerList, reqCategoryList, reqFloorBannerList } from "@/api";

export default {
	// 大store怎样使用，小store就怎样使用，含有的配置项也是一样
	state: {
		categoryList: [],
		bannerList: [],
		floorBannerList: [],
	},
	mutations: {
		UPDATE_CATEGORYLIST(state, res) {
			state.categoryList = res;
		},
		UPDATE_BANNERLIST(state, bannerList) {
			state.bannerList = bannerList;
		},
		UPDATE_FLOORBANNERLIST(state, floorBannerList) {
			state.floorBannerList = floorBannerList;
		},
	},
	actions: {
		// 定义action中的对象函数
		async getCategoryList({ commit }) {
			const res = await reqCategoryList();
			if (res.code === 200) {
				// 触发mutations函数
				commit("UPDATE_CATEGORYLIST", res);
			}
		},
		// 发起获取轮播图数据请求
		async getBannerList({ commit }) {
			const res = await reqBannerList();
			if (res.code === 200) {
				commit("UPDATE_BANNERLIST", res.data);
			}
		},
		// 发起获取楼层轮播图的数据请求
		async getFloorBannerList({ commit }) {
			const res = await reqFloorBannerList();
			if (res.code === 200) {
				commit("UPDATE_FLOORBANNERLIST", res.data);
			}
		},
	},
	getters: {
		floorBannerList(state) {
			return state.floorBannerList;
		},
	},
};
