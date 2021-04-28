import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/styles/global.css";
import {
  Button,
  Layout,
  Menu,
  Input,
  Space,
  Cascader,
  Carousel,
  Row,
  Col,
  Affix,
  Skeleton,
  Modal,
  Tabs,
  Icon,
  Form,
  Tag,
  Checkbox,
  Breadcrumb,
  Badge,
  InputNumber,
  Dropdown,
  Popconfirm,
  Pagination,
  Avatar,
  Tooltip,
  Steps,
  BackTop,
  Spin,
  Upload,
  Select,
  Comment
} from "ant-design-vue";

import Message from "vue-m-message";
import "vue-m-message/dist/index.css";
import infiniteScroll from "vue-infinite-scroll";
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
Vue.use(Viewer);

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Input);
Vue.use(Space);
Vue.use(Cascader);
Vue.use(Carousel);
Vue.use(Row);
Vue.use(Col);
Vue.use(Affix);
Vue.use(Skeleton);
Vue.use(Modal);
Vue.use(Tabs);
Vue.use(Icon);
Vue.use(Form);
Vue.use(Checkbox);
Vue.use(Breadcrumb);
Vue.use(Tag);
Vue.use(InputNumber);
Vue.use(Badge);
Vue.use(Dropdown);
Vue.use(Popconfirm);
Vue.use(Pagination);
Vue.use(Tooltip);
Vue.use(Steps);
Vue.use(BackTop);
Vue.use(infiniteScroll);
Vue.use(Spin);
Vue.use(Upload);
Vue.use(Select);
Vue.use(Comment);
Vue.use(Avatar);
Vue.use(Message, { name: "msg" });
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
