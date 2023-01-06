<template>
	<header class="header">
		<!-- 头部的第一行 -->
		<div class="top">
			<div class="container">
				<div class="loginList" v-if="Object.keys(userInfo).length === 0">
					<p>尚品汇欢迎您！</p>
					<p>
						<span>请</span>
						<router-link to="/login">登录</router-link>
						<router-link to="/register" class="register">免费注册</router-link>
						<!-- <router-link to="/test" class="register">test</router-link> -->
					</p>
				</div>
				<div class="loginList" v-else>
					<p>尚品汇欢迎您！</p>
					<p>
						<span>请</span>
						<router-link to="/login">用户名：{{ userInfo.name }}</router-link>
						<a class="register" @click="userLogout">退出登录</a>
						<!-- <router-link to="/test" class="register">test</router-link> -->
					</p>
				</div>
				<div class="typeList">
					<router-link to="/center">我的订单</router-link>
					<router-link to="/shopcart">我的购物车</router-link>
					<a href="###">我的尚品汇</a>
					<a href="###">尚品汇会员</a>
					<a href="###">企业采购</a>
					<a href="###">关注尚品汇</a>
					<a href="###">合作招商</a>
					<a href="###">商家后台</a>
				</div>
			</div>
		</div>
		<!--头部第二行 搜索区域-->
		<div class="bottom">
			<h1 class="logoArea">
				<router-link to="/home" class="logo" title="尚品汇"><img src="./images/logo.png" alt="" /></router-link>
			</h1>
			<div class="searchArea">
				<form action="###" class="searchForm">
					<input v-model="keyword" type="text" id="autocomplete" class="input-error input-xxlarge" />
					<button @click="keywordSearch" class="sui-btn btn-xlarge btn-danger" type="button">搜索</button>
				</form>
			</div>
		</div>
	</header>
</template>

<script>
import { reqUserLogout } from "@/api";
import { mapState } from "vuex";
export default {
	name: "Header",
	data() {
		return {
			keyword: undefined,
		};
	},
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo,
		}),
	},
	methods: {
		keywordSearch() {
			// 利用编程导航进行路由跳转,解决再次点击报错问题
			/**
			 * resolve：成功的回调函数
			 * reject：失败的回调函数
			 * 解决方案1：在this.$router.push({},resolve,reject)
			 * 解决方案2：在this.$router.push({},resolve/reject)
			 * 解决方案3：在this.$router.push({}).catch(){}捕获异常
			 */
			if (this.keyword === "") this.keyword = undefined;
			this.$router.push({
				params: {
					keyword: this.keyword,
				},
				query: this.$route.query,
				name: "search",
			});
		},
		async userLogout() {
			try {
				await this.$store.dispatch("userLogout");
				// 将token和userInfo清空
				this.$store.state.user.token = "";
				this.$store.state.user.userInfo = {};
				localStorage.removeItem("token");
				// 点击退出登录跳转到首页
				this.$router.push("/home");
			} catch (error) {
				alert("退出失败");
			}
		},
	},
};
</script>

<style lang="less" scoped>
.header {
	& > .top {
		background-color: #eaeaea;
		height: 30px;
		line-height: 30px;

		.container {
			width: 1200px;
			margin: 0 auto;
			overflow: hidden;

			.loginList {
				float: left;

				p {
					float: left;
					margin-right: 10px;

					.register {
						border-left: 1px solid #b3aeae;
						padding: 0 5px;
						margin-left: 5px;
					}
				}
			}

			.typeList {
				float: right;

				a {
					padding: 0 10px;

					& + a {
						border-left: 1px solid #b3aeae;
					}
				}
			}
		}
	}

	& > .bottom {
		width: 1200px;
		margin: 0 auto;
		overflow: hidden;

		.logoArea {
			float: left;

			.logo {
				img {
					width: 175px;
					margin: 25px 45px;
				}
			}
		}

		.searchArea {
			float: right;
			margin-top: 35px;

			.searchForm {
				overflow: hidden;

				input {
					box-sizing: border-box;
					width: 490px;
					height: 32px;
					padding: 0px 4px;
					border: 2px solid #ea4a36;
					float: left;

					&:focus {
						outline: none;
					}
				}

				button {
					height: 32px;
					width: 68px;
					background-color: #ea4a36;
					border: none;
					color: #fff;
					float: left;
					cursor: pointer;

					&:focus {
						outline: none;
					}
				}
			}
		}
	}
}
</style>
