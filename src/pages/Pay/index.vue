<template>
	<div class="pay-main">
		<div class="pay-container">
			<div class="checkout-tit">
				<h4 class="tit-txt">
					<span class="success-icon"></span>
					<span class="success-info">订单提交成功，请您及时付款，以便尽快为您发货~~</span>
				</h4>
				<div class="paymark">
					<span class="fl">
						请您在提交订单<em class="orange time">{{ countdownTime }}</em> 之内完成支付，超时订单会自动取消。订单号：<em>{{ orderId }}</em>
					</span>
					<span class="fr">
						<em class="lead">应付金额：</em><em class="orange money">￥{{ payInfo?.totalFee }}</em>
					</span>
				</div>
			</div>
			<div class="checkout-info">
				<h4>重要说明：</h4>
				<ol>
					<li>尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。</li>
					<li>其它支付渠道正在调试中，敬请期待。</li>
					<li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
				</ol>
				<h4>支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）</h4>
				<ul>
					<li>支付帐号：11111111</li>
					<li>密码：111111</li>
					<li>支付密码：111111</li>
				</ul>
			</div>
			<div class="checkout-steps">
				<div class="step-tit">
					<h5>支付平台</h5>
				</div>
				<div class="step-cont">
					<ul class="payType">
						<li><img src="./images/pay2.jpg" /></li>
						<li><img src="./images/pay3.jpg" /></li>
					</ul>
				</div>
				<div class="hr"></div>

				<div class="payshipInfo">
					<div class="step-tit">
						<h5>支付网银</h5>
					</div>
					<div class="step-cont">
						<ul class="payType">
							<li><img src="./images/pay10.jpg" /></li>
							<li><img src="./images/pay11.jpg" /></li>
							<li><img src="./images/pay12.jpg" /></li>
							<li><img src="./images/pay13.jpg" /></li>
							<li><img src="./images/pay14.jpg" /></li>
							<li><img src="./images/pay15.jpg" /></li>
							<li><img src="./images/pay16.jpg" /></li>
							<li><img src="./images/pay17.jpg" /></li>
							<li><img src="./images/pay18.jpg" /></li>
							<li><img src="./images/pay19.jpg" /></li>
							<li><img src="./images/pay20.jpg" /></li>
							<li><img src="./images/pay21.jpg" /></li>
							<li><img src="./images/pay22.jpg" /></li>
						</ul>
					</div>
				</div>
				<div class="hr"></div>

				<div class="submit">
					<!-- <router-link class="btn" to="/paysuccess">立即支付</router-link> -->
					<a class="btn" @click="payHandler">立即支付</a>
				</div>
				<div class="otherpay">
					<div class="step-tit">
						<h5>其他支付方式</h5>
					</div>
					<div class="step-cont">
						<span><a href="weixinpay.html" target="_blank">微信支付</a></span>
						<span>中国银联</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import QRCode from "qrcode";
export default {
	name: "Pay",
	data() {
		return {
			payInfo: {},
			createTime: "",
			endTime: "",
			countdown: 7200000, //14399000
			countdownTime: "",
			timer: "",
			payTimer: "",
			payStatus: 0,
		};
	},
	mounted() {
		this.getPayInfo();
	},
	beforeDestroy() {
		clearInterval(this.timer);
		this.timer = "";
		clearInterval(this.payTimer);
		this.payTimer = "";
	},
	computed: {
		orderId() {
			return this.$route.params.orderId;
		},
	},
	methods: {
		async getPayInfo() {
			try {
				const res = await this.$api.reqGetPayInfo(this.orderId);
				this.payInfo = res.data;
				this.createTime = Date.now();
				this.endTime = this.createTime + this.countdown;
				this.timer = setInterval(() => {
					this.createTime += 1000;
					this.orderTime(this.createTime, this.endTime);
				}, 1000);
			} catch (error) {
				alert("获取订单信息失败");
			}
		},
		orderTime(createTime, endTime) {
			const countdown = endTime - createTime;
			const dayToMillisecond = 86400000;
			const hourToMillisecond = 3600000;
			const minuteToMillisecond = 60000;
			// 正在倒计时
			if (endTime - createTime >= 0) {
				// 处理倒计时格式 一天毫秒：86,400,000
				// 说明倒计时大于一天
				if (countdown > dayToMillisecond) {
					const day = parseInt(countdown / dayToMillisecond);
					const hour = parseInt((countdown % dayToMillisecond) / hourToMillisecond);
					const minute = parseInt(((countdown % dayToMillisecond) % hourToMillisecond) / minuteToMillisecond);
					const second = parseInt((((countdown % dayToMillisecond) % hourToMillisecond) % minuteToMillisecond) / 1000);
					// console.log(`${day}天${hour}小时${minute}分钟${second}秒`);
					this.countdownTime = `${day}天${hour}小时${minute}分钟${second}秒`;
				} else {
					// 一小时有3,600,000毫秒
					// 倒计时小于一天
					const hour = parseInt(countdown / hourToMillisecond);
					const minute = parseInt((countdown % hourToMillisecond) / minuteToMillisecond);
					const second = parseInt(((countdown % hourToMillisecond) % minuteToMillisecond) / 1000);
					// console.log(`${hour}小时${minute}分钟${second}秒`);
					this.countdownTime = `${hour}小时${minute}分钟${second}秒`;
				}
			} else {
				alert("支付时间已过，此订单已失效，正在跳转到购物车列表页");
				clearInterval(this.timer);
				this.timer = "";
				this.$router.push("/shopcart");
			}
		},
		async payHandler() {
			try {
				this.payTimer = setInterval(async () => {
					const res = await this.$api.reqGetPayStatus(this.orderId);
					if (res.code === 200) {
						clearInterval(this.payTimer);
						this.payTimer = "";
						// 保存支付状态
						this.payStatus = res.code;
						// 将弹窗关闭掉
						this.$msgbox.close();
						// 说明支付成功,跳转到支付成功页面
						this.$router.push("/paysuccess");
					}
				}, 2000);
				const pagImgUrl = await QRCode.toDataURL(this.payInfo.codeUrl);
				// 支付通道弹窗
				this.$alert(`<img src='${pagImgUrl}' >`, "微信扫码支付", {
					dangerouslyUseHTMLString: true,
					showClose: false, // MessageBox 是否显示右上角关闭按钮
					showCancelButton: true, // 是否显示取消按钮
					cancelButtonText: "支付遇到问题", // 取消按钮的文本内容
					confirmButtonText: "支付成功", // 确定按钮的文本内容
					center: true, // 是否居中布局
					beforeClose: (action, instance, done) => {
						/**
						 * action：点击的行为
						 * instance：ueComponent实例
						 * done：关闭函数
						 */
						// console.log(action, instance, done);
						if (action === "confirm") {
							if (this.payStatus === 200) {
								// 真的是支付成功了，那么进行跳转到支付成功页面
								clearInterval(this.payTimer);
								this.payTimer = "";
								done();
								this.$router.push("/paysuccess");
							} else {
								alert("您还未支付，请支付订单");
							}
						} else {
							// 支付遇到问题
							clearInterval(this.payTimer);
							this.payTimer = "";
							alert("请联系客服或者拨打我们热线：12345");
							done();
						}
					},
				}).catch(() => {});
			} catch (error) {
				alert("获取微信支付二维码失败");
			}
		},
	},
};
</script>

<style lang="less" scoped>
.pay-main {
	margin-bottom: 20px;

	.pay-container {
		margin: 0 auto;
		width: 1200px;

		a:hover {
			color: #4cb9fc;
		}

		.orange {
			color: #e1251b;
		}

		.money {
			font-size: 18px;
		}

		.zfb {
			color: #e1251b;
			font-weight: 700;
		}

		.checkout-tit {
			padding: 10px;

			.tit-txt {
				font-size: 14px;
				line-height: 21px;

				.success-icon {
					width: 30px;
					height: 30px;
					display: inline-block;
					background: url(./images/icon.png) no-repeat 0 0;
				}

				.success-info {
					padding: 0 8px;
					line-height: 30px;
					vertical-align: top;
				}
			}

			.paymark {
				overflow: hidden;
				line-height: 26px;
				text-indent: 38px;

				.fl {
					float: left;
				}

				.fr {
					float: right;

					.lead {
						margin-bottom: 18px;
						font-size: 15px;
						font-weight: 400;
						line-height: 22.5px;
					}
				}
			}
		}

		.checkout-info {
			padding-left: 25px;
			padding-bottom: 15px;
			margin-bottom: 10px;
			border: 2px solid #e1251b;

			h4 {
				margin: 9px 0;
				font-size: 14px;
				line-height: 21px;
				color: #e1251b;
			}

			ol {
				padding-left: 25px;
				list-style-type: decimal;
				line-height: 24px;
				font-size: 14px;
			}

			ul {
				padding-left: 25px;
				list-style-type: disc;
				line-height: 24px;
				font-size: 14px;
			}
		}

		.checkout-steps {
			border: 1px solid #ddd;
			padding: 25px;

			.hr {
				height: 1px;
				background-color: #ddd;
			}

			.step-tit {
				line-height: 36px;
				margin: 15px 0;
			}

			.step-cont {
				margin: 0 10px 12px 20px;

				ul {
					font-size: 0;

					li {
						margin: 2px;
						display: inline-block;
						padding: 5px 20px;
						border: 1px solid #ddd;
						cursor: pointer;
						line-height: 18px;
					}
				}
			}
		}

		.submit {
			text-align: center;

			.btn {
				display: inline-block;
				padding: 15px 45px;
				margin: 15px 0 10px;
				font: 18px "微软雅黑";
				font-weight: 700;
				border-radius: 0;
				background-color: #e1251b;
				border: 1px solid #e1251b;
				color: #fff;
				text-align: center;
				vertical-align: middle;
				cursor: pointer;
				user-select: none;
				text-decoration: none;
			}
		}
	}
}
</style>
