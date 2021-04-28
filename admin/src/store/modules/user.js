import { handleBackLogin, getUserInfo } from "../../api/index";
import { getToken, setToken, removeToken } from "@/utils/auth";
import Message from "vue-m-message";
const user = {
  state: {
    user: "",
    current_info: "",
    token: getToken(),
    roles: [],
  },

  mutations: {
    SET_INFO: (state, info) => {
      state.current_info = info;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const { email, password } = userInfo;
      return new Promise((resolve, reject) => {
        handleBackLogin({ email, password })
          .then((response) => {
            if (response.code === 200) {
              const token = response.token;
              commit("SET_TOKEN", token);
              setToken(token);
              resolve();
            } else {
              Message.warning(response.msg);
              reject();
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((response) => {
            commit("SET_ROLES", response.data.roles);
            commit("SET_INFO", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        commit("SET_TOKEN", "");
        commit("SET_ROLES", []);
        commit("SET_INFO", "");
        removeToken();
        resolve();
      });
    },
  },
};

export default user;
