/**
 * 此文件是管理所有的请求
 */
import ajax from "./ajax";
import mockAjax from "./mockAjax";

// 三级分类列表
export const reqCategoryList = () => ajax({ url: "/product/getBaseCategoryList", method: "get" });
// 获取模拟轮播图数据
export const reqBannerList = () => mockAjax({ url: "/banners", method: "get" });
// 获取楼层轮播图
export const reqFloorBannerList = () => mockAjax({ url: "/floors", method: "get" });
// 根据条件搜索商品信息
export const reqSearchGoods = searchCondition => ajax({ url: "/list", method: "post", data: searchCondition });
// 获取商品的详细信息
export const reqGoodsDetail = skuId => ajax({ url: `/item/${skuId}`, method: "get" });
// 添加商品到购物车和修改物品的数量（变化量为正数表示增加，负数表示减少）
export const reqGoodsToCart = (skuId, skuNum) => ajax({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });
// 获取购物车列表
export const reqCartList = () => ajax({ url: `/cart/cartList`, method: "get" });
// 切换商品选中状态
export const reqChangeChecked = (skuId, isChecked) => ajax({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" });
// 批量选中购物车商品
export const reqBatchCheckCart = (isChecked, skuIdList) => ajax({ url: `/cart/batchCheckCart/${isChecked}`, method: "post", data: skuIdList });
// 批量删除购物车
export const reqBatchDeleteCart = skuIdList => ajax({ url: `/cart/batchDeleteCart`, method: "post", data: skuIdList });
// 删除购物车的商品
export const reqDeleteCartGoods = skuId => ajax({ url: `/cart/deleteCart/${skuId}`, method: "delete" });
// 用户注册
export const reqRegisterUser = registerUserInfo => ajax({ url: `/user/passport/register`, method: "post", data: registerUserInfo });
// 获取验证码
export const reqRegisterCode = phone => ajax({ url: `/user/passport/sendCode/${phone}`, method: "get" });
// 用户登录
export const reqUserLogin = loginInfo => ajax({ url: `/user/passport/login`, method: "post", data: loginInfo });
// 根据token获取用户信息
export const reqGetUserInfo = () => ajax({ url: `/user/passport/auth/getUserInfo`, method: "GET" });
// 退出登录
export const reqUserLogout = () => ajax({ url: `/user/passport/logout`, method: "get" });
// 获取交易页信息
export const reqTradeInfo = () => ajax({ url: `/order/auth/trade`, method: "get" });
// 提交订单
export const reqSubmitOrder = (tradeNo, orderInfo) => ajax({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: "post", data: orderInfo });
// 获取订单支付信息
export const reqGetPayInfo = orderId => ajax({ url: `/payment/weixin/createNative/${orderId}`, method: "get" });
// 查询订单的支付状态
export const reqGetPayStatus = orderId => ajax({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: "get" });
// 获取订单列表
export const reqOrderList = (page, limit) => ajax({ url: `/order/auth/${page}/${limit}`, method: "get" });
