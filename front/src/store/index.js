import Vue from "vue";
import Vuex from "vuex";
import { getUserCurrentApi } from "../api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    info: {},
    orderList: [],
  },
  mutations: {
    SET_INFO(state, info) {
      state.info = info;
    },
    CLEAR_INFO(state) {
      state.info = {};
    },
    SET_ORDER_LIST(state, list) {
      state.orderList = list;
    },
  },
  actions: {
    GET_INFO({ commit }) {
      if (localStorage.getItem("token")) {
        return new Promise((resolve, reject) => {
          getUserCurrentApi().then((res) => {
            if (res.code === 200) {
              commit("SET_INFO", res.data);
              resolve();
            }
          });
        });
      }
    },
  },
});
