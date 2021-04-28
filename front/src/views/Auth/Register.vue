<template>
  <a-form :form="form" @submit="handleRegister">
    <a-form-item v-bind="formItemLayout" label="用户名" has-feedback>
      <a-input
        v-decorator="[
          'nickname',
          {
            rules: [
              { required: true, message: '请输入昵称!', whitespace: true },
              { min: 3, max: 12, message: '用户名在3-12位之间!' },
            ],
          },
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="密码" has-feedback>
      <a-input
        v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: '请输入密码',
              },
              { min: 6, max: 18, message: '密码在6-18位之间!' },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
        type="password"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="确认密码" has-feedback>
      <a-input
        v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: '请确认输入密码',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
        type="password"
        @blur="handleConfirmBlur"
      />
    </a-form-item>

    <a-form-item label="邮箱地址" v-bind="formItemLayout">
      <a-row :gutter="8">
        <a-col :span="15">
          <a-input
            v-decorator="[
              'email',
              {
                rules: [
                  {
                    type: 'email',
                    message: '请输入合法的邮箱地址',
                  },
                  {
                    required: true,
                    message: '请输入邮箱地址',
                  },
                ],
              },
            ]"
          />
        </a-col>
        <a-col :span="5">
          <a-button @click="handleSendMail" :disabled="sendDisabled">{{ sendText }}</a-button>
        </a-col>
      </a-row>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="验证码" has-feedback>
      <a-input
        v-decorator="[
          'code',
          {
            rules: [{ required: true, message: '请输入邮箱验证码!', whitespace: true }],
          },
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="tailFormItemLayout">
      <a-button type="primary" html-type="submit" block style="width:248px">
        注册
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { handleRegisterApi, sendEmailApi } from "../../api";
import { validateEmail } from "../../utils/validate";
export default {
  data() {
    return {
      email: "",
      timer: null,
      sendText: "发送邮箱",
      sendDisabled: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 6,
          },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("两次输入的密码不一致");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    handleRegister(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          handleRegisterApi(values).then(res=>{
            if(res.code === 200) {
              this.$msg.success("注册成功");
              this.form.resetFields();
            }
          })
        }
      });
    },
    handleReset() {
      this.form.resetFields();
    },
    handleSendCountDown() {
      let total = 10;
      this.sendDisabled = true;
      this.timer = setInterval(() => {
        total--;
        this.sendText = `${total}s后重新发送`;
        if (total === 0) {
          this.sendDisabled = false;
          this.sendText = "发送邮箱";
          clearInterval(this.timer);
          this.timer = null;
        }
      }, 1000);
    },
    handleSendMail() {
      let email = this.form.getFieldValue("email");
      if (validateEmail(email)) {
        sendEmailApi({ email }).then((res) => {
          if (res.code === 200) {
            this.handleSendCountDown();
            this.$msg.success("发送成功");
          }
        });
      } else {
        this.$msg.warning("邮箱格式不正确");
      }
    },
  },
};
</script>

<style lang="less" scoped>

.ant-btn-primary {
  background-color: #fc4646;
  border-color: #fc4646;
}
</style>
