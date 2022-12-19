<template>
	<div>
		<h1>search</h1>
		<h1>keyword: {{ keyword }}</h1>
		<h1>keyword1：{{ keyword1 }}</h1>
	</div>
</template>

<script>
export default {
	name: "Search",
	props: ["keyword", "keyword1"],
};
</script>

<style lang="less" scoped></style>
