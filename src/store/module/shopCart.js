/**
 * 1、定义小store
 * 2、将小store汇总至总store，也可以叫是大store
 */

import { reqBatchCheckCart, reqBatchDeleteCart, reqCartList, reqChangeChecked, reqDeleteCartGoods } from "@/api";

export default {
	// 大store怎样使用，小store就怎样使用，含有的配置项也是一样
	state: {
		cartList: [],
	},
	mutations: {
		UPDATE_CARTLIST(state, cartList) {
			state.cartList = cartList;
		},
	},
	actions: {
		// 发起购物车列表请求
		async getCartList({ commit }) {
			const res = await reqCartList();
			if (res.code === 200) {
				commit("UPDATE_CARTLIST", res.data[0]?.cartInfoList || []);
			}
		},
		// 传参数，那么commit必须进行占位，这样才能接收到参数值
		async changeChecked({ commit }, { skuId, isChecked }) {
			const res = await reqChangeChecked(skuId, isChecked);
			if (res.code === 200) {
				return "ok";
			} else {
				return Promise.reject("fail");
			}
		},
		// 批量选中购物车商品
		async batchCheckCart({ commit }, { isChecked, skuIdList }) {
			const res = await reqBatchCheckCart(isChecked, skuIdList);
			if (res.code === 200) {
				return "ok";
			} else {
				return Promise.reject("fail");
			}
		},
		// 批量删除购物车
		async batchDeleteCart({ commit }, skuIdList) {
			const res = await reqBatchDeleteCart(skuIdList);
			if (res.code === 200) {
				return "ok";
			} else {
				return Promise.reject("fail");
			}
		},
		// 删除购物车商品
		async deleteCartShop({ commit }, skuId) {
			const res = await reqDeleteCartGoods(skuId);
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
