<template>
  <a-layout>
    <a-affix style="z-index: 999;">
      <a-layout-header>
        <CommonHeader />
      </a-layout-header>
    </a-affix>

    <a-layout-content>
      <router-view :key="key"/>
      <a-back-top />
    </a-layout-content>
  </a-layout>
</template>


<script>
import CommonHeader from "./components/CommonHeader";
export default {
  computed:{
    key() {
      return this.$route.path+Math.random();
    }
  },
  components:{
    CommonHeader
  }
}
</script>


<style lang="less">
body {
  min-width: 1270px;
}
.ant-layout {
  background-color: #fff;
}
.ant-layout-header {
  background-color: #fff;
  line-height: 0px;
  height: 70px;
  padding: 0;
  box-shadow: 0 8px 24px -2px rgba(0, 0, 0, 0.05);
  .t-header {
    width: 1270px;
    margin: auto;
    padding: 8px 0;
  }
}
.ant-layout-content {
  width: 1270px;
  margin: auto;
  margin-bottom: 50px;
}
</style>
