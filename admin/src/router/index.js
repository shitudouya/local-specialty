import Vue from "vue";
import Router from "vue-router";
import Layout from "@/views/layout/Layout";

Vue.use(Router);
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/
export const constantRouterMap = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("@/views/home/index"),
        name: "home",
        meta: { title: "首页", icon: "home", noCache: true, affix: true },
      },
    ],
  },

  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
];
export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
});
export const asyncRouterMap = [
  {
    path: "/seller",
    component: Layout,
    meta: { title: "入驻商家", icon: "seller", roles: ["admin"], noCache: true },
    children: [
      {
        path: "",
        name: "seller",
        component: () => import("@/views/seller/index"),
        meta: { title: "入驻商家", icon: "seller", noCache: true },
      },
    ],
  },
  {
    path: "/product",
    component: Layout,
    meta: { title: "商品管理", icon: "product", roles: ["admin"] },
    children: [
      {
        path: "check",
        name: "product-check",
        component: () => import("@/views/product/check"),
        meta: { title: "商品审核", noCache: true },
      },
      {
        path: "view",
        name: "product-view",
        component: () => import("@/views/product/view"),
        meta: { title: "商品查看", noCache: true },
      },
    ],
  },
  {
    path: "/order",
    component: Layout,
    meta: { title: "订单管理", icon: "order", noCache: true, roles: ["seller"] },
    children: [
      {
        path: "check",
        name: "order-check",
        component: () => import("@/views/order/check"),
        meta: { title: "待处理", noCache: true },
      },
      {
        path: "view",
        name: "order-view",
        component: () => import("@/views/order/view"),
        meta: { title: "历史订单", noCache: true },
      },
    ],
  },
  {
    path: "/news",
    component: Layout,
    meta: { title: "资讯管理", icon: "news", roles: ["admin"] },
    children: [
      {
        path: "view",
        name: "news-view",
        component: () => import("@/views/news/view"),
        meta: { title: "资讯查看", noCache: true },
      },
      {
        path: "add",
        name: "news-add",
        component: () => import("@/views/news/add"),
        meta: { title: "资讯添加", noCache: true },
      },
    ],
  },
  {
    path: "/market",
    component: Layout,
    meta: { title: "营销管理", icon: "yx", noCache: true, roles: ["admin"] },
    children: [
      {
        path: "carousel",
        name: "carousel",
        component: () => import("@/views/market/carousel"),
        meta: { title: "轮播图", noCache: true },
      },
      {
        path: "recommend",
        name: "recommend",
        component: () => import("@/views/market/recommend"),
        meta: { title: "周推荐", noCache: true },
      },
    ],
  },
  {
    path: "/sproduct",
    component: Layout,
    meta: { title: "商品管理", icon: "product", roles: ["seller"] },
    children: [
      {
        path: "view",
        name: "sproduct-view",
        component: () => import("@/views/s-product/view"),
        meta: { title: "商品查看", noCache: true },
      },
      {
        path: "add",
        name: "sproduct-add",
        component: () => import("@/views/s-product/add"),
        meta: { title: "商品添加", noCache: true },
      },
    ],
  },
  {
    path: "/notify",
    component: Layout,
    children: [
      {
        path: "",
        name: "notify",
        component: () => import("@/views/notify/index"),
        meta: { title: "消息中心", icon: "notify", roles: ["seller"], noCache: true },
      },
    ],
  },
  {
    path: "*",
    name: "error",
    component: () => import("@/views/notfound/index"),
    hidden: true,
  },
];
