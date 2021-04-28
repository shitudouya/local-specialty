<template>
  <div>
    <Slider />
    <Banner />
    <Recommend/>
    <HotRecommend />
    <Like />
  </div>
</template>

<script>
import Slider from "./components/Slider";
import Banner from "./components/Banner";
import HotRecommend from "./components/HotRecommend";
import Recommend from "./components/Recommend"
import Like from "./components/Like";
export default {
  name: "Home",
  components: {
    Slider,
    Banner,
    HotRecommend,
    Recommend,
    Like,
  },
};
</script>

<style lang="less" scoped>

</style>
