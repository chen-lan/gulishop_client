<template>
	<div>
		<button @click="test">获取数据</button>
		<!-- 全写 -->
		<h1>直接读取小store的值： {{ $store.state.home.num }}</h1>
		<!-- 简写，利用计算属性 -->
		<h1>简写获取小store的值：{{ num }}</h1>
		<!-- 映射总store值 -->
		<h1>获取总的store：{{ msg1 }}</h1>
		<button @click="getBigStore">获取大store信息</button>
		<!-- 点击修改小store中的num值 -->
		<button @click="updateNum">点击修改小store中的num值</button>
		<button @click="actionUpdateNum">点击利用action修改小store中的num值</button>
	</div>
</template>

<script>
/**
 * 总结： mapState,mapMutations,mapActions里面都是配置对象，配置对象都是写key:值（字符串）
 */
import { reqCategoryList } from "@/api";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
	name: "Test",
	computed: {
		// 映射出总store
		// ...mapState(["msg"]),
		// 对象的形式
		...mapState({
			msg1: "msg",
		}),
		// 映射模块的store，可以通过函数的返回值进行获取，默认接受到大store的参数
		...mapState({
			num: function (state) {
				return state.home.num;
			},
		}),
	},
	methods: {
		async test() {
			// 写发起axios请求
			const res = await reqCategoryList();
			console.log(res);
		},
		getBigStore() {
			console.log("大store", this.$store);
		},
		// 映射mapMutations
		...mapMutations({
			updateNum: "FN1",
		}),
		...mapActions({
			actionUpdateNum: "fn1",
		}),
	},
};
</script>

<style lang="less" scoped></style>
