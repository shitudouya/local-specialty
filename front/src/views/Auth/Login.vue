<template>
  <a-form @submit="handleSubmit">
    <a-form-item>
      <a-input placeholder="请输入邮箱" size="large" v-model="form.email">
        <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input type="password" placeholder="请输入密码" size="large" v-model="form.password">
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input placeholder="右侧验证码" style="width:60%;float:left" size="large" v-model="form.code">
        <a-icon slot="prefix" type="safety" style="color: rgba(0,0,0,.25)" />
      </a-input>
      <div class="code-img" v-html="captchaSvg" @click="getCaptcha"></div>
    </a-form-item>
    <a-form-item>
      <a-checkbox :checked="remember" @change="handleCheck">
        记住密码
      </a-checkbox>
      <router-link class="form-forgot" to="/forget" style="float:right">
        忘记密码
      </router-link>
    </a-form-item>
    <a-form-item class="opearte-list">
      <a-button type="primary" block html-type="submit" style="width:380px">
        登录
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { validateEmail } from "../../utils/validate";
import { getCaptchaApi, handleLoginApi } from "../../api/index";
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        code: "",
      },
      captchaSvg: "",
      remember: false,
    };
  },
  mounted() {
    if (Cookies.get("email") && Cookies.get("password") && Cookies.get("remember")) {
      this.remember = true;
      this.form.email = Cookies.get("email");
      this.form.password = Cookies.get("password");
    }
    this.getCaptcha();
  },
  methods: {
    getCaptcha() {
      getCaptchaApi().then((res) => {
        if (res.code === 200) {
          this.captchaSvg = res.data;
        }
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      const { email, password, code } = this.form;
      if (validateEmail(email)) {
        if (password.trim().length === 0) {
          this.$msg.warning("密码不能为空");
        } else {
          if (code.trim().length === 0) {
            this.$msg.warning("验证码码不能为空");
          } else {
            handleLoginApi({ email, password, code }).then((res) => {
              if (res.code === 200) {
                if (this.remember) {
                  Cookies.set("remember", "yes", { expires: 7 });
                  Cookies.set("email", email, { expires: 7 });
                  Cookies.set("password", password, { expires: 7 });
                } else {
                  Cookies.remove("remember");
                  Cookies.remove("email");
                  Cookies.remove("password");
                }
                localStorage.setItem("token", res.token);
                this.$store.dispatch("GET_INFO");

                this.$msg.success("登录成功");
                this.$emit("handleClose");
              } else {
                this.$msg.warning(res.msg);
              }
            });
          }
        }
      } else {
        this.$msg.warning("邮箱格式不正确");
      }
    },
    handleCheck(e) {
      this.remember = e.target.checked;
    },
  },
};
</script>

<style lang="less" scoped>
.ant-form-item {
  margin-bottom: 12px;
}
.ant-btn-primary {
  background-color: #fc4646;
  border-color: #fc4646;
}
.code-img {
  width: 36%;
  float: left;
  margin-left: 14px;
  height: 40px;
  border-radius: 2px;
  cursor: pointer;
}
.opearte-list {
  display: flex;
  justify-content: center;
}
</style>
