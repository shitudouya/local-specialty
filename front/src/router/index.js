import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home/Home";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/product/:id",
    name: "product_detail",
    component: () => import("../views/Product_Detail/index"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/Cart/index"),
  },
  {
    path: "/order/confirm",
    component: () => import("../views/Order/index"),
  },
  {
    path: "/all",
    component: () => import("../views/All/index"),
  },
  {
    path: "/forget",
    component: () => import("../views/Forget/index"),
  },
  {
    path: "/news",
    component: () => import("../views/News/index"),
  },
  {
    path: "/news/:id",
    component: () => import("../views/News_Detail/index"),
  },
  {
    path: "/checkout/result",
    component: () => import("../views/PayResult/index"),
  },
  {
    path: "/mine",
    redirect: "/mine/order",
    component: () => import("../views/Personal/index"),
    children: [
      { path: "order", component: () => import("../views/Personal/components/Order") },
      { path: "store", component: () => import("../views/Personal/components/Store") },
      { path: "private", component: () => import("../views/Personal/components/Private") },
      { path: "address", component: () => import("../views/Personal/components/Address") },
      { path: "seller", component: () => import("../views/Personal/components/Upgrade") },
      { path: "*", component: () => import("../views/NotFound/index") },
    ],
  },
  {
    path: "/search",
    component: () => import("../views/Search/index"),
  },
  {
    path: "*",
    component: () => import("../views/NotFound/index"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

export default router;
