<template>
	<div>
		<!-- 全局组件，直接用，不用导入进来 -->
		<TypeNav></TypeNav>
		<List></List>
		<Recommend></Recommend>
		<Rank></Rank>
		<Like></Like>
		<Floor></Floor>
		<Floor></Floor>
		<Brand></Brand>
	</div>
</template>

<script>
import List from "./components/List";
import Recommend from "./components/Recommend";
import Rank from "./components/Rank";
import Like from "./components/Like";
import Floor from "./components/Floor";
import Brand from "./components/Brand";
export default {
	name: "Home",
	components: {
		List,
		Recommend,
		Rank,
		Like,
		Floor,
		Brand,
	},
};
</script>

<style lang="less" scoped></style>
