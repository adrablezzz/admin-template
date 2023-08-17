<template>
  <div class="login">
    <div class="login-center">
      <div class="login-form-wrapper">
        <Form
          ref="formDataRef"
          :model="formData"
          :rules="rule"
          class="login-form"
        >
          <FormItem prop="user">
            <Input
              type="text"
              v-model="formData.user"
              placeholder="请输入账号"
              prefix="md-person"
            >
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input
              type="password"
              v-model="formData.password"
              placeholder="请输入密码"
              prefix="md-eye-off"
            >
            </Input>
          </FormItem>
          <FormItem>
            <Button v-debounce="handleSubmit" long class="login-submit"
              >登录</Button
            >
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import userModel from "@/api/userApi";
import md5 from "js-md5";
import { useStore } from "@/store";
const store = useStore();
import { useRouter } from "vue-router";
const router = useRouter();

const formData = ref({ user: "", password: "" });
const rule = reactive({
  user: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "change",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "change",
    },
  ],
});
const formDataRef = ref<any>(null);
const handleSubmit = (): void => {
  formDataRef.value.validate((val: boolean) => {
    if (val) {
      let password: string = md5(
        formData.value.password +
          "gonganju" +
          formData.value.password.split("").reverse().join("")
      );

      let params: object = {
        client: "web.backend",
        phone: formData.value.user,
        password,
      };
      interface UserInfo {
        id: number;
        role: number;
        staffId: string;
        truename: string;
        type: number;
        username: string | number;
      }
      userModel.login(params).then((da: any) => {
        let token: string = da.data.javaToken;
        let { id, role, staffId, truename, type, username } = da.data.userInfo;
        let userInfo: UserInfo = {
          id,
          role,
          staffId,
          truename,
          type,
          username,
        };
        store.login(token, userInfo);
        router.push("/");
      });
    }
  });
};
onMounted(() => {
  //在登录页禁止返回
  history.pushState(null, '', document.URL);
  window.addEventListener("popstate", function () {
    history.pushState(null, '', document.URL);
  });
});
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  width: 100%;
  background-image: url("../../assets/img/login_mask_bg.png");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-center {
    background-image: url("../../assets/img/login_bg.png");
    background-position: center;
    background-size: 100% 100%;
    width: 820px;
    height: 400px;
    position: relative;
    .login-form-wrapper {
      width: 300px;
      height: 210px;
      position: absolute;
      background: #fff;
      right: 100px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 14px 20px;
      .login-form {
        .login-submit {
          background: #6d8a3e;
          color: #fff;
        }
      }
    }
  }
}
</style>
