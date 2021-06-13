import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: { requiresAuth: true },
	},
	{
		path: "/login",
		name: "Login",
		component: Login,
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (!localStorage.getItem("access_token")) {
			next({
				path: "login",
			});
		} else {
			next();
			store.commit("SET_LOGIN", true);
		}
	} else {
		next();
	}
});

export default router;
