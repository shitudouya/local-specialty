<template>
  <div class="forget-container">
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <!-- 验证邮箱 -->
      <div class="validate-email" v-if="current === 0">
        <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
          <a-form-item label="邮箱地址">
            <a-input v-model="email" />
          </a-form-item>
        </a-form>
      </div>

      <!-- 修改密码 -->
      <div class="validate-email" v-if="current === 1">
        <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <a-form-item label="输入验证码">
            <a-input v-model="code" />
          </a-form-item>
          <a-form-item label="请输入新的密码">
            <a-input v-model="password" type="password" />
          </a-form-item>
          <a-form-item label="重复输入密码">
            <a-input v-model="confirm" type="password" />
          </a-form-item>
        </a-form>
      </div>

      <!-- 修改密码 -->
      <div class="validate-email" v-if="current === 2">
        <img src="../../assets/images/success.png" style="text-align:center;width:100px" alt="success" />
        <p style="font-size:24px;color:#484848">修改成功</p>
      </div>
    </div>
    <div class="operate">
      <a-button v-if="current === 0" type="primary" @click="handleValidateEmail">
        发送验证码
      </a-button>
      <a-button v-else-if="current === 1" type="primary" @click="handleModifyPwd">
        下一步
      </a-button>
      <a-button v-else-if="current === 2" type="primary" @click="handleOK">
        完成
      </a-button>
    </div>
  </div>
</template>

<script>
import { ModifyPwdApi, sendMailCanModify } from "../../api";
import { validateEmail } from "../../utils/validate";
export default {
  data() {
    return {
      current: 0,
      steps: [{ title: "验证邮箱" }, { title: "修改密码" }, { title: "修改结果" }],
      email: "",
      code: "",
      sendDisabled: false,
      timer: null,
      isSend: false,
      sendText: "发送验证码",
      password: "",
      confirm: "",
    };
  },
  methods: {
    handleValidateEmail() {
      if (validateEmail(this.email)) {
        this.$msg.loading("发送中，请稍后");
        sendMailCanModify({ email: this.email }).then((res) => {
          if (res.code === 200) {
            this.$msg.closeAll();
            this.$msg.success("发送成功，请注意查看邮箱");
            this.current++;
          } else {
            this.$msg.closeAll();
            this.$msg.warning(res.msg);
          }
        });
      } else {
        this.$msg.warning("邮箱格式不正确");
      }
    },
    handleModifyPwd() {
      if (this.code.trim().length !== 0) {
        if (this.password.trim().length !== 0) {
          if (this.confirm.trim().length !== 0) {
            if (this.confirm !== this.password) {
              this.$msg.warning("两次输入的密码不一致");
            } else {
              ModifyPwdApi({ code: this.code, password: this.password }).then((res) => {
                if (res.code === 200) {
                  this.$msg.success("修改成功");
                  this.code = "";
                  this.confirm = "";
                  this.password = "";
                  this.current++;
                } else {
                  this.$msg.warning(res.msg);
                }
              });
            }
          } else {
            this.$msg.warning("请重复输入密码");
          }
        } else {
          this.$msg.warning("请输入密码");
        }
      } else {
        this.$msg.warning("请输入验证码");
      }
    },
    handleOK() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="less" scoped>
.forget-container {
  width: 720px;
  margin: 60px auto;
}
.validate-email {
  width: 70%;
  margin: 60px auto 0;
  text-align: center;
}
.operate {
  text-align: center;
}
</style>
