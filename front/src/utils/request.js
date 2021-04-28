import Message from "vue-m-message";
import axios from "axios";

import NProgress from "nprogress";
import { BASE_URL } from "../config";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    NProgress.start();
    if (localStorage.getItem("token")) {
      config.headers.Authorization = localStorage.getItem("token");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response.data;
  },
  (error) => {
    NProgress.done();
    const { status } = error.response;
    if (status === 403 || status === 401) {
      Message.warning("状态失效，请重新登录");
      localStorage.removeItem("token");
      setTimeout(() => {
        window.location.reload(true);
      }, 500);
    }
    return Promise.reject(error);
  }
);

export default instance;
