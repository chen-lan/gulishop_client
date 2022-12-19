import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import TypeNav from "@/components/TypeNav";

Vue.config.productionTip = false;

Vue.component("TypeNav", TypeNav);

new Vue({
	router, // 让每个组件都可以通过$router和$route来访问路由对象
	render: h => h(App),
}).$mount("#app");
