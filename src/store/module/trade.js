/**
 * 1、定义小store
 * 2、将小store汇总至总store，也可以叫是大store
 */

import { reqSubmitOrder, reqTradeInfo } from "@/api";

export default {
	// 大store怎样使用，小store就怎样使用，含有的配置项也是一样
	state: {
		tradeInfo: {},
		orderId: 0,
	},
	mutations: {
		UPDATE_TRADEINFO(state, tradeInfo) {
			state.tradeInfo = tradeInfo;
		},
		UPDATE_ORDERID(state, orderId) {
			state.orderId = orderId;
		},
	},
	actions: {
		async getTradeInfo({ commit }) {
			const res = await reqTradeInfo();
			if (res.code === 200) {
				commit("UPDATE_TRADEINFO", res.data);
				return "ok";
			} else {
				return "fail";
			}
		},
		// 提交订单
		async submitOrder({ commit }, { tradeNo, orderInfo }) {
			try {
				const res = await reqSubmitOrder(tradeNo, orderInfo);
				if (res.code === 200) {
					commit("UPDATE_ORDERID", res.data);
					return "ok";
				} else {
					return "fail";
				}
			} catch (error) {}
		},
	},
	getters: {
		//
	},
};
