import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";

Vue.use(Vuex);

axios.defaults.baseURL = "http://localhost:3000";

export default new Vuex.Store({
	state: {
		login: false,
		inventories: [],
	},
	mutations: {
		SET_LOGIN(state, payload) {
			state.login = payload;
		},
		SET_INVENTORIES(state, payload) {
			state.inventories = payload;
		},
	},
	actions: {
		login(context, payload) {
			const { email, password } = payload;
			axios({
				method: "post",
				url: "/login",
				headers: {
					"content-type": "application/json",
				},
				data: {
					email,
					password,
				},
			}).then((data) => {
				const access_token = data.data.access_token;
				localStorage.setItem("access_token", access_token);
				context.commit("SET_LOGIN", true);
				router.push({ name: "Home" });
			});
		},
		logout() {
			localStorage.removeItem("access_token");
			router.push({ name: "Login" });
		},
		getInventories(context) {
			axios({
				method: "get",
				url: "/inventories",
				headers: {
					"content-type": "application/json",
					access_token: localStorage.getItem("access_token"),
				},
			})
				.then((data) => {
					context.commit("SET_INVENTORIES", data.data);
				})
				.catch((err) => {
					console.log(err);
				});
		},
	},
	modules: {},
});
