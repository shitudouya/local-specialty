import axios from "axios";
import { Message } from "element-ui";
import { BASE_URL } from "../config";
import router from "../router/index";
const service = axios.create({
  baseURL: BASE_URL, // api 的 base_url
  timeout: 20000, // request timeout
});

service.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      config.headers["Authorization"] = localStorage.getItem("token");
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => response.data,
  (error) => {
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    localStorage.removeItem("token");
    setTimeout(() => {
      router.push("/login");
    }, 200);
    return Promise.reject(error);
  }
);

export default service;
