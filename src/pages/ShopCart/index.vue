<template>
	<div class="cart">
		<h4>全部商品</h4>
		<div class="cart-main">
			<div class="cart-th">
				<div class="cart-th1">全部</div>
				<div class="cart-th2">商品</div>
				<div class="cart-th3">单价（元）</div>
				<div class="cart-th4">数量</div>
				<div class="cart-th5">小计（元）</div>
				<div class="cart-th6">操作</div>
			</div>
			<div class="cart-body">
				<ul class="cart-list" v-for="(goods, index) in cartList" :key="index">
					<li class="cart-list-con1">
						<input type="checkbox" name="chk_list" :checked="goods.isChecked" @click="isCheckedHandler(goods)" />
					</li>
					<li class="cart-list-con2">
						<img :src="goods.imgUrl" />
						<div class="item-msg">{{ goods.skuName }}</div>
					</li>
					<li class="cart-list-con4">
						<span class="price">{{ goods.skuPrice }}</span>
					</li>
					<li class="cart-list-con5">
						<a class="mins" @click="changeGoodsNum('sub', goods, -1)">-</a>
						<input
							autocomplete="off"
							type="text"
							:value="goods.skuNum"
							minnum="1"
							class="itxt"
							@change="changeGoodsNum('input', goods, $event.target.value * 1)" />
						<a class="plus" @click="changeGoodsNum('increase', goods, 1)">+</a>
					</li>
					<li class="cart-list-con6">
						<span class="sum">{{ goods.skuPrice * goods.skuNum }}</span>
					</li>
					<li class="cart-list-con7">
						<a @click="deleteCartGoods(goods.skuId)" class="sindelet">删除</a>
						<br />
					</li>
				</ul>
			</div>
		</div>
		<div class="cart-tool" v-if="cartList.length">
			<div class="select-all">
				<input class="chooseAll" type="checkbox" v-model="allCheck" />
				<span>全选</span>
			</div>
			<div class="option">
				<a @click="batchDeleteCart">删除选中的商品</a>
			</div>
			<div class="money-box">
				<div class="chosed">
					已选择 <span>{{ allSelectNum }}</span
					>件商品
				</div>
				<div class="sumprice">
					<em>总价（不含运费） ：</em>
					<i class="summoney">{{ totalPrice }}</i>
				</div>
				<div class="sumbtn">
					<!-- <a class="sum-btn">结算</a> -->
					<router-link class="sum-btn" to="/trade">结算</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
import { reqDeleteCartGoods } from "@/api";
export default {
	name: "ShopCart",
	data() {
		return {};
	},
	mounted() {
		// 注意：未登录时，得加唯一临时id记录临时用户信息，注意点：唯一、不可变
		this.getCartList();
	},
	computed: {
		...mapState({
			cartList: state => state.shopCart.cartList,
		}),
		allCheck: {
			// 读取属性值
			get() {
				return this.cartList.every(goods => goods.isChecked === 1);
			},
			// 修改属性值
			async set(newVal) {
				const skuIdList = this.cartList.map(goods => goods.skuId);
				try {
					await this.$store.dispatch("batchCheckCart", { isChecked: newVal === true ? 1 : 0, skuIdList });
					this.getCartList();
				} catch (error) {
					alert("全选购物车列表商品失败");
				}
			},
		},
		allSelectNum() {
			return this.cartList.reduce((pre, goods) => {
				if (goods.isChecked === 1) return (pre += goods.skuNum);
				return pre;
			}, 0);
		},
		totalPrice() {
			return this.cartList.reduce((pre, goods) => {
				if (goods.isChecked === 1) return (pre += goods.cartPrice * goods.skuNum);
				return pre;
			}, 0);
		},
	},
	methods: {
		getCartList() {
			this.$store.dispatch("getCartList");
		},
		changeGoodsNum: throttle(
			async function (type, goods, skuNum) {
				// skuNum = Number(skuNum);
				if (goods.skuNum + skuNum < 1 && (type === "sub" || type === "increase")) return;
				if (type === "input") skuNum = skuNum - goods.skuNum === 0 || skuNum < 1 ? 0 : skuNum - goods.skuNum;
				try {
					await this.$store.dispatch("putGoodsToCart", { skuId: goods.skuId, skuNum });
					// 重新发起请求获取购物车商品列表
					this.getCartList();
				} catch (error) {
					alert("修改商品数量失败");
				}
			},
			500,
			{ trailing: false }
		),

		async isCheckedHandler(goods) {
			try {
				await this.$store.dispatch("changeChecked", { skuId: goods.skuId, isChecked: goods.isChecked === 1 ? 0 : 1 });
				this.getCartList();
			} catch (error) {
				alert("修改选中状态失败");
			}
		},
		async batchDeleteCart() {
			const skuIdList = [];
			this.cartList.forEach(goods => {
				if (goods.isChecked === 1) {
					skuIdList.push(goods.skuId);
				}
			});
			if (skuIdList.length === 0) return;
			try {
				await this.$store.dispatch("batchDeleteCart", skuIdList);
				this.getCartList();
			} catch (error) {
				alert("删除购物车已选商品失败");
			}
		},
		async deleteCartGoods(skuId) {
			try {
				await reqDeleteCartGoods(skuId);
				this.getCartList();
			} catch (error) {
				alert("删除商品失败");
			}
		},
	},
};
</script>

<style lang="less" scoped>
.cart {
	width: 1200px;
	margin: 0 auto;
	h4 {
		margin: 9px 0;
		font-size: 14px;
		line-height: 21px;
	}
	.cart-main {
		.cart-th {
			background: #f5f5f5;
			border: 1px solid #ddd;
			padding: 10px;
			overflow: hidden;
			& > div {
				float: left;
			}
			.cart-th1 {
				width: 25%;
				input {
					vertical-align: middle;
				}
				span {
					vertical-align: middle;
				}
			}
			.cart-th2 {
				width: 25%;
			}
			.cart-th3,
			.cart-th4,
			.cart-th5,
			.cart-th6 {
				width: 12.5%;
			}
		}
		.cart-body {
			margin: 15px 0;
			border: 1px solid #ddd;
			.cart-list {
				padding: 10px;
				border-bottom: 1px solid #ddd;
				overflow: hidden;
				& > li {
					float: left;
				}
				.cart-list-con1 {
					width: 15%;
				}
				.cart-list-con2 {
					width: 35%;
					img {
						width: 82px;
						height: 82px;
						float: left;
					}
					.item-msg {
						float: left;
						width: 150px;
						margin: 0 10px;
						line-height: 18px;
					}
				}
				.cart-list-con4 {
					width: 10%;
				}
				.cart-list-con5 {
					width: 17%;
					.mins {
						border: 1px solid #ddd;
						border-right: 0;
						float: left;
						color: #666;
						width: 6px;
						text-align: center;
						padding: 8px;
						text-decoration: none;
					}
					input {
						border: 1px solid #ddd;
						width: 40px;
						height: 31px;
						float: left;
						text-align: center;
						font-size: 14px;
					}

					.plus {
						border: 1px solid #ddd;
						border-left: 0;
						float: left;
						color: #666;
						width: 6px;
						text-align: center;
						padding: 8px;
						text-decoration: none;
					}
				}

				.cart-list-con6 {
					width: 10%;

					.sum {
						font-size: 16px;
					}
				}

				.cart-list-con7 {
					width: 13%;

					a {
						color: #666;
					}
				}
			}
		}
	}
	.cart-tool {
		overflow: hidden;
		border: 1px solid #ddd;

		.select-all {
			padding: 10px;
			overflow: hidden;
			float: left;

			span {
				vertical-align: middle;
			}

			input {
				vertical-align: middle;
			}
		}

		.option {
			padding: 10px;
			overflow: hidden;
			float: left;

			a {
				float: left;
				padding: 0 10px;
				color: #666;
			}
		}

		.money-box {
			float: right;

			.chosed {
				line-height: 26px;
				float: left;
				padding: 0 10px;
			}

			.sumprice {
				width: 200px;
				line-height: 22px;
				float: left;
				padding: 0 10px;

				.summoney {
					color: #c81623;
					font-size: 16px;
				}
			}

			.sumbtn {
				float: right;
				a {
					display: block;
					position: relative;
					width: 96px;
					height: 52px;
					line-height: 52px;
					color: #fff;
					text-align: center;
					font-size: 18px;
					font-family: "Microsoft YaHei";
					background: #e1251b;
					overflow: hidden;
					text-decoration: none;
					&hover {
						color: white !important;
					}
				}
			}
		}
	}
}
</style>
