<template>
	<div class="type-nav">
		<div class="container">
			<div class="nav-left" @mouseleave="moveOut">
				<h2 class="all" @mouseenter="isShow = true">全部商品分类</h2>
				<transition name="category">
					<div class="sort" @click="goSearch" v-if="isShow">
						<div class="all-sort-list2">
							<!-- activeItem: currentIndex === index利用排他法（参考值法），当index===currentIndex那一项才显示 -->
							<div
								class="item"
								:class="{ activeItem: currentIndex === index }"
								v-for="(c1, index) in categoryList.data"
								:key="c1.categoryId"
								@mouseenter="moveIn(index)"
								@mouseleave="currentIndex = -1">
								<h3>
									<!-- <router-link></router-link> 这种组件标签，会导致页面滑动会卡，所以我们使用编程式导航和事件方式进行优化 -->
									<a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
								</h3>
								<div class="item-list clearfix">
									<div class="subitem">
										<dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
											<dt>
												<a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
											</dt>
											<dd>
												<em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
													<a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
												</em>
											</dd>
										</dl>
									</div>
								</div>
							</div>
						</div>
					</div>
				</transition>
			</div>
			<nav class="nav">
				<a href="###">服装城</a>
				<a href="###">美妆馆</a>
				<a href="###">尚品汇超市</a>
				<a href="###">全球购</a>
				<a href="###">闪购</a>
				<a href="###">团购</a>
				<a href="###">有趣</a>
				<a href="###">秒杀</a>
			</nav>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
	name: "TypeNav",
	data() {
		return {
			currentIndex: -1,
			isShow: false,
		};
	},
	// 组件挂载时，请求数据,mouted是一个函数
	mounted() {
		this.homeIsShow();
	},
	// methods触发actios和mutations的配置对象函数
	methods: {
		// throttle()的返回值是一个节流函数
		moveIn: throttle(
			function (index) {
				this.currentIndex = index;
			},
			60,
			{ trailing: false }
		),
		goSearch(e) {
			const { categoryname, category1id, category2id, category3id } = e.target.dataset;
			// 如果存在undefined，在query参数不会显示的
			// categoryname如果有值的话，说明点击的是a标签
			if (categoryname) {
				this.$router.push({
					name: "search",
					query: {
						categoryName: categoryname,
						category1id,
						category2id,
						category3id,
					},
					params: this.$route.params,
				});
			}
		},
		homeIsShow() {
			if (this.$route.path === "/home") {
				this.isShow = true;
			}
		},
		moveOut() {
			if (this.$route.path !== "/home") {
				this.isShow = false;
			}
		},
	},
	computed: {
		...mapState({
			categoryList: state => {
				return state.home.categoryList;
			},
		}),
	},
};
</script>

<style lang="less" scoped>
.type-nav {
	border-bottom: 2px solid #e1251b;

	.container {
		width: 1200px;
		margin: 0 auto;
		display: flex;
		position: relative;

		.all {
			width: 210px;
			height: 45px;
			background-color: #e1251b;
			line-height: 45px;
			text-align: center;
			color: #fff;
			font-size: 14px;
			font-weight: bold;
		}

		.nav {
			a {
				height: 45px;
				margin: 0 22px;
				line-height: 45px;
				font-size: 16px;
				color: #333;
			}
		}

		.sort {
			position: absolute;
			left: 0;
			top: 45px;
			width: 210px;
			height: 461px;
			background: #fafafa;
			z-index: 999;

			.all-sort-list2 {
				.item {
					&.activeItem {
						background-color: skyblue;
					}
					h3 {
						line-height: 30px;
						font-size: 14px;
						font-weight: 400;
						overflow: hidden;
						padding: 0 20px;
						margin: 0;

						a {
							color: #333;
						}
					}

					.item-list {
						display: none;
						position: absolute;
						width: 734px;
						min-height: 460px;
						background: #f7f7f7;
						left: 210px;
						border: 1px solid #ddd;
						top: 0;
						z-index: 9999 !important;

						.subitem {
							float: left;
							width: 650px;
							padding: 0 4px 0 8px;

							dl {
								border-top: 1px solid #eee;
								padding: 6px 0;
								overflow: hidden;
								zoom: 1;

								&.fore {
									border-top: 0;
								}

								dt {
									float: left;
									width: 54px;
									line-height: 22px;
									text-align: right;
									padding: 3px 6px 0 0;
									font-weight: 700;
								}

								dd {
									float: left;
									width: 415px;
									padding: 3px 0 0;
									overflow: hidden;

									em {
										float: left;
										height: 14px;
										line-height: 14px;
										padding: 0 8px;
										margin-top: 5px;
										border-left: 1px solid #ccc;
									}
								}
							}
						}
					}

					&:hover {
						.item-list {
							display: block;
						}
					}
				}
			}
		}
	}
}
.category-enter {
	height: 0;
	opacity: 0;
}
.category-enter-active {
	transition: all 2s;
}
.category-enter-to {
	height: 461px;
	opacity: 1;
}
</style>
