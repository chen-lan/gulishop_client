<template>
	<div class="swiper-container" :ref="someRef">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="item in someList" :key="item.id">
				<img :src="item.imgUrl" />
			</div>
		</div>
		<!-- 如果需要分页器 -->
		<div class="swiper-pagination"></div>

		<!-- 如果需要导航按钮 -->
		<div class="swiper-button-prev"></div>
		<div class="swiper-button-next"></div>
	</div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
export default {
	name: "Carousel",
	props: ["someList", "someRef"],
	watch: {
		someList: {
			handler(newVal, oldVal) {
				// 保证轮播图获取到数据并结构完整，才能实例化出swiper
				if (!newVal.length) return;
				this.$nextTick(() => {
					new Swiper(this.$refs[this.someRef], {
						loop: true,
						spaceBetween: 30,
						centeredSlides: true,
						autoplay: {
							delay: 2000,
							disableOnInteraction: false, // 不停止的自动轮播
						},
						pagination: {
							el: ".swiper-pagination",
							clickable: true,
						},
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

<style lang="less" scoped></style>
