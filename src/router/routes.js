// import Home from "@/pages/Home";
// import Login from "@/pages/Login";
// import Register from "@/pages/Register";
// import Search from "@/pages/Search";
// import Detail from "@/pages/Detail";
// import AddCartSuccess from "@/pages/AddCartSuccess";
// import ShopCart from "@/pages/ShopCart";
// import Trade from "@/pages/Trade";
// import Pay from "@/pages/Pay";
// import PaySuccess from "@/pages/PaySuccess";
// import Center from "@/pages/Center";
// import MyOrder from "@/pages/Center/MyOrder";
// import GroupOrder from "@/pages/Center/GroupOrder";
// import Test from "@/pages/Test";
const Home = () => import("@/pages/Home");
const Login = () => import("@/pages/Login");
const Register = () => import("@/pages/Register");
const Search = () => import("@/pages/Search");
const Detail = () => import("@/pages/Detail");
const AddCartSuccess = () => import("@/pages/AddCartSuccess");
const ShopCart = () => import("@/pages/ShopCart");
const Trade = () => import("@/pages/Trade");
const Pay = () => import("@/pages/Pay");
const PaySuccess = () => import("@/pages/PaySuccess");
const Center = () => import("@/pages/Center");
const MyOrder = () => import("@/pages/Center/MyOrder");
const GroupOrder = () => import("@/pages/Center/GroupOrder");

import store from "@/store";
const token = store.state.user.token;
export default [
	{
		path: "/center",
		component: Center,
		children: [
			{
				path: "myorder",
				component: MyOrder,
			},
			{
				path: "grouporder",
				component: GroupOrder,
			},
			{
				path: "",
				redirect: "myorder",
			},
		],
	},
	{
		path: "/paysuccess",
		component: PaySuccess,
	},
	{
		path: "/pay/:orderId?",
		component: Pay,
		name: "pay",
		beforeEnter: (to, from, next) => {
			if (from.path.indexOf("/trade") !== -1 || from.path === "/" || from.path.indexOf("/login") !== -1) {
				next();
			} else {
				next(false);
			}
		},
	},
	{
		path: "/trade",
		component: Trade,
		beforeEnter: (to, from, next) => {
			if (from.path.indexOf("/shopcart") !== -1 || from.path === "/" || from.path.indexOf("/login") !== -1) {
				next();
			} else {
				next(false);
			}
		},
	},
	{
		path: "/detail/:skuId",
		component: Detail,
	},
	{
		path: "/home",
		component: Home,
	},
	{
		path: "/login",
		component: Login,
		meta: {
			isHidden: true,
		},
	},
	{
		path: "/register",
		component: Register,
		meta: {
			isHidden: true,
		},
	},
	{
		path: "/search/:keyword?",
		component: Search,
		name: "search",
		props(route) {
			return {
				keyword: route.params.keyword,
			};
		},
	},
	{
		path: "/addcartsuccess",
		component: AddCartSuccess,
	},
	{
		path: "/shopcart",
		component: ShopCart,
	},
	{
		path: "/",
		redirect: "/home",
	},
];
