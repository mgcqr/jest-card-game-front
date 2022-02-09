<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="wellcome"
      width="30%"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :show-close="false"
      :close-on-press-escape="false"
    >
      <div id="login">
        <p>{{ loginMsg }}</p>
        <el-input v-model="userName" placeholder="userName" />
        <el-input
          v-model="passWord"
          placeholder="passWord"
          type="password"
          show-password
        />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="signUp">Sign Up</el-button>
          <el-button type="primary" @click="logIn">Log In</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import rsa from "../util/Rsa";
import ResponseReader from "../util/ResponseReader";

function thenFun(response, that) {
  //console.log(response);
  that.loginMsg = ResponseReader.getMessage(response);
  that.token = ResponseReader.getPayload(response).token;
  if (that.loginMsg === "ok") {
    var userInfo = {
      name : that.userName,
      token : that.token
    }
    that.$emit("loginReady", userInfo);
    that.dialogVisible = false;
  }
}

export default {
  name: "Login",
  data() {
    return {
      userName: null,
      passWord: null,
      loginMsg: null,
      token: null,
      publicKey: null,

      dialogVisible: true,
    };
  },
  emits: {
    loginReady: null,
  },
  methods: {
    logIn() {
      let dto = {
        userName: this.userName,
        passWord: rsa.encrypt(this.passWord, this.publicKey),
      };
      this.axios({
        method: "put",
        url: "/api/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: dto,
      })
        .then((response) => {
          thenFun(response, this);
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },
    signUp() {
      let dto = {
        userName: this.userName,
        passWord: rsa.encrypt(this.passWord, this.publicKey),
      };
      this.axios({
        method: "post",
        url: "/api/login/sign-up",
        headers: {
          "Content-Type": "application/json",
        },
        data: dto,
      })
        .then((response) => {
          thenFun(response, this);
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },

    handleClose(done) {
      console.log("closing");
      done();
    },
  },
  mounted() {
    this.axios({
      method: "get",
      url: "/api/login/public-key",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        this.publicKey = ResponseReader.getPayload(response).public_key;
        // console.log(response);
        // console.log(this.publicKey);
      })
      .catch(function (error) {
        // 请求失败处理
        console.log(error);
      });
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
