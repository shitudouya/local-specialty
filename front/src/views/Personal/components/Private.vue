<template>
  <div class="my-box">
    <div class="left">
      <a-upload
        name="file"
        class="avatar-uploader"
        :showUploadList="false"
        :customRequest="uploadImage"
        :beforeUpload="beforeUpload"
        accept="image/jpeg,image/jpg,image/png"
      >
        <div class="avatar">
          <img :src="info.avatar" alt="avatar" />
          <span class="tip">更换头像</span>
        </div>
      </a-upload>
    </div>
    <div class="right">
      <p>昵称：{{ info.nickname }}</p>
      <p>邮箱账号：{{ info.email }}</p>
      <p>密码安全：<router-link to="/forget" class="forget">修改密码</router-link></p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { changeUserAvatarApi, handleUploadImage } from "../../../api";
export default {
  computed: {
    ...mapState({
      info: "info",
    }),
  },
  methods: {
    beforeUpload(file) {
      const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$msg.warning("只能上传jpg/png格式的头像!");
      }
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        this.$msg.warning("图片不得大于1MB!");
      }
      return isJpgOrPng && isLt1M;
    },
    uploadImage(file) {
      this.$msg.loading("正在上传头像...");
      handleUploadImage(file.file).then((res) => {
        changeUserAvatarApi({ avatar: res.img }).then((res) => {
          if (res.code === 200) {
            this.$store.dispatch("GET_INFO");
            setTimeout(() => {
              this.$msg.closeAll();
              this.$msg.success("修改成功");
            }, 500);
          }
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.forget {
  color: #ff9900;
}
.my-box {
  display: flex;
  .left {
    img {
      width: 100px;
      border-radius: 50%;
      margin-right: 20px;
      cursor: pointer;
    }
  }
}
.avatar {
  position: relative;
  .tip {
    position: absolute;
    bottom: -20px;
    right: 50%;
    transform: translateX(30%);
    color: #888;
    font-size: 12.5px;
  }
}
</style>
