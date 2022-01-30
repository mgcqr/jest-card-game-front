<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      :title="title"
      width="30%"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div id="login">
        <el-input v-model="userName" placeholder="userName" />
        <el-input
          v-model="passWord"
          placeholder="passWord"
          type="password"
          show-password
        />
        <!-- <button @click="login">login</button> -->
        <!-- <p>{{ loginMsg }}</p> -->
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="change">{{ defaultBtnText }}</el-button>
          <el-button type="primary" @click="login">{{ primaryBtnText }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      title: "Log In",
      userName: null,
      passWord: null,
      loginMsg: null,
      helloMsg: null,
      token: null,
      dialogVisible: true,
      defaultBtnText: "Sign Up",
      primaryBtnText: "Log In",
      isLoggingIn: true,
    };
  },
  methods: {
    login() {
      let postData = {
        userName: this.userName,
        passWord: this.passWord,
        isLoggingIn: this.isLoggingIn,
      };
      axios({
        method: "post",
        url: "/api/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: postData,
      })
        .then((response) => {
          this.loginMsg = response.data;
          this.token = response.data.token;
          console.log(response);
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },
    change() {
      if (this.isLoggingIn) {
        this.title = "Sign Up";
        this.defaultBtnText = "Log In";
        this.primaryBtnText = "Sign Up";
      } else {
        this.title = "Log In";
        this.defaultBtnText = "Sign Up";
        this.primaryBtnText = "Log In";
      }
      this.isLoggingIn = !this.isLoggingIn;
      console.log(this.isLoggingIn);
    },

    handleClose(done) {
      console.log("closing");
      done();
    },
  },
};
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
  /* margin: 0 auto; */
}
</style>
