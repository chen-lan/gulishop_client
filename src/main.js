import Vue from "vue";
import App from "./App.vue";
import { MessageBox } from "element-ui";
import VueLazyload from "vue-lazyload";
import router from "@/router";
import store from "./store";
import "@/mock/mockServer"; //必须引入进来
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
import * as api from "@/api";
import imgLazy from "@/assets/imgLazy.gif"; // 加后缀
import "@/utils/validate";

Vue.config.productionTip = false;

Vue.component("TypeNav", TypeNav);
Vue.component("Carousel", Carousel);
Vue.component("Pagination", Pagination);

// 将api接口对象放在原型上，各个组件(原因是组件通过Object.create(VC.prototype = Vue.Prototype))都可以通过$api的方式拿到这个api对象
Vue.prototype.$api = api;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.use(VueLazyload, {
	loading: imgLazy,
});

new Vue({
	beforeCreate() {
		Vue.prototype.$bus = this;
	},
	router, // 让每个组件都可以通过$router和$route来访问路由对象
	store, // 让每个组件都可以通过$store访问的到
	render: h => h(App),
}).$mount("#app");
