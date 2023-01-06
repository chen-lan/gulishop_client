<template>
	<div class="swiper-container" ref="smallImg">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(skuImage, index) in skuImageList" :key="skuImage.id">
				<img @click="checkImage(index)" :class="{ active: index === defaultIndex }" :src="skuImage.imgUrl" />
			</div>
		</div>
		<div class="swiper-button-next"></div>
		<div class="swiper-button-prev"></div>
	</div>
</template>

<script>
import Swiper from "swiper";
export default {
	name: "ImageList",
	data() {
		return {
			defaultIndex: 0,
		};
	},
	props: ["skuImageList"],
	methods: {
		checkImage(index) {
			this.defaultIndex = index;
			this.$bus.$emit("checkImage", index);
		},
	},
	watch: {
		skuImageList: {
			handler(newVal, oldVal) {
				// 保证轮播图获取到数据并结构完整，才能实例化出swiper
				if (!newVal.length) return;
				this.$nextTick(() => {
					new Swiper(this.$refs.smallImg, {
						slidesPerView: 3, //一屏显示几张图片
						slidesPerGroup: 2, //控制每次走几张图
						navigation: {
							nextEl: ".swiper-button-next",
							prevEl: ".swiper-button-prev",
						},
					});
				});
			},
			immediate: true,
		},
	},
};
</script>

<style lang="less" scoped>
.swiper-container {
	height: 56px;
	width: 412px;
	box-sizing: border-box;
	padding: 0 12px;

	.swiper-slide {
		width: 56px;
		height: 56px;

		img {
			width: 100%;
			height: 100%;
			border: 1px solid #ccc;
			padding: 2px;
			width: 50px;
			height: 50px;
			display: block;

			&.active {
				border: 2px solid #f60;
				padding: 1px;
			}

			// &:hover {
			// 	border: 2px solid #f60;
			// 	padding: 1px;
			// }
		}
	}

	.swiper-button-next {
		left: auto;
		right: 0;
	}

	.swiper-button-prev {
		left: 0;
		right: auto;
	}

	.swiper-button-next,
	.swiper-button-prev {
		box-sizing: border-box;
		width: 12px;
		height: 56px;
		background: rgb(235, 235, 235);
		border: 1px solid rgb(204, 204, 204);
		top: 0;
		margin-top: 0;
		&::after {
			font-size: 12px;
		}
	}
}
</style>
