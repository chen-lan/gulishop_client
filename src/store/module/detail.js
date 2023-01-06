/**
 * 1、定义小store
 * 2、将小store汇总至总store，也可以叫是大store
 */

import { reqGoodsDetail, reqGoodsToCart } from "@/api";

export default {
	// 大store怎样使用，小store就怎样使用，含有的配置项也是一样
	state: {
		goodsDetail: {},
	},
	mutations: {
		UPDATE_GOODSDETAIL(state, goodsDetail) {
			state.goodsDetail = goodsDetail;
		},
	},
	actions: {
		async getGoodsDetail({ commit }, skuId) {
			const res = await reqGoodsDetail(skuId);
			if (res.code === 200) {
				commit("UPDATE_GOODSDETAIL", res.data);
			}
		},
		async putGoodsToCart({ commit }, { skuId, skuNum }) {
			const res = await reqGoodsToCart(skuId, skuNum);
			if (res.code === 200) {
				// 成功
				return "ok";
			} else {
				// 失败
				return new Promise.reject("fail");
			}
		},
	},
	getters: {
		categoryView(state) {
			return state.goodsDetail.categoryView || {};
		},
		skuInfo(state) {
			return state.goodsDetail.skuInfo || {};
		},
		spuSaleAttrList(state) {
			return state.goodsDetail.spuSaleAttrList || [];
		},
	},
};
