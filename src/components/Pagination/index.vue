<template>
	<div class="pagination">
		<button :disabled="pageNo === 1" @click="$emit('searchOfPageNo', pageNo - 1)">上一页</button>
		<button v-if="startEnd.start > 1" @click="$emit('searchOfPageNo', 1)">1</button>
		<button v-if="startEnd.start > 2">···</button>

		<button
			:class="{ active: num + startEnd.start - 1 === pageNo }"
			v-for="num in startEnd.end - startEnd.start + 1"
			:key="num + startEnd.start - 1"
			@click="$emit('searchOfPageNo', num + startEnd.start - 1)">
			{{ num + startEnd.start - 1 }}
		</button>

		<button v-if="startEnd.end < totalPage - 1">···</button>
		<button v-if="startEnd.end < totalPage" @click="$emit('searchOfPageNo', totalPage)">{{ totalPage }}</button>
		<button :disabled="pageNo === totalPage" @click="$emit('searchOfPageNo', pageNo + 1)">下一页</button>

		<button style="margin-left: 30px">共 {{ total }} 条</button>
	</div>
</template>

<script>
export default {
	name: "Pagination",
	props: ["total", "pageNo", "pageSize", "continues"],
	computed: {
		totalPage() {
			// 计算出最后一页
			return Math.ceil(this.total / this.pageSize);
		},
		// 计算出开始也和结束页
		startEnd() {
			const { pageNo, continues, totalPage } = this;
			let start;
			let end;
			if (continues > totalPage) {
				// 连续页数大于总页数，说明已超出页面范围
				start = 1;
				end = totalPage;
			} else {
				// 总页数正常大于连续页数
				start = pageNo - Math.floor(continues / 2);
				end = pageNo + Math.floor(continues / 2);
				// 左侧小于1超出
				if (start < 1) {
					start = 1;
					end = end + start + 1;
				} else {
					// 右侧结尾超出
					if (end > totalPage) {
						end = totalPage;
						start -= end - totalPage; // (totalpage-continue+1)
					}
				}
			}
			return {
				start,
				end,
			};
		},
	},
};
</script>

<style lang="less" scoped>
.pagination {
	text-align: center;
	button {
		margin: 0 5px;
		background-color: #f4f4f5;
		color: #606266;
		outline: none;
		border-radius: 2px;
		padding: 0 4px;
		vertical-align: top;
		display: inline-block;
		font-size: 13px;
		min-width: 35.5px;
		height: 28px;
		line-height: 28px;
		cursor: pointer;
		box-sizing: border-box;
		text-align: center;
		border: 0;

		&[disabled] {
			color: #c0c4cc;
			cursor: not-allowed;
		}

		&.active {
			cursor: not-allowed;
			background-color: #409eff;
			color: #fff;
		}
	}
}
</style>
