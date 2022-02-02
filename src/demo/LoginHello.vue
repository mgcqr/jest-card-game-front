<template>
  <div>
    <el-button type="text" @click="dialogVisible = true"
      >click to open the Dialog</el-button
    >
    <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <span>This is a message</span>
      <div id="login">
        <button @click="login">login</button>
        <p>{{ loginMsg }}</p>

        <button @click="hello">hello</button>
        <p>{{ helloMsg }}</p>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "LoginHello",
  data() {
    return {
      loginMsg: null,
      helloMsg: null,
      token: null,
      dialogVisible: false,
    };
  },
  methods: {
    login() {
      let postData = {
        userName: "mgcqr",
        passWord: "123456",
      };
      this.axios({
        method: "post",
        url: "/api/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: postData,
      })
        .then((response) => {
          this.loginMsg = response.data;
          this.token = response.data.payload.token;
          console.log(response);
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },
    hello() {
      this.axios({
        method: "get",
        url: "/api/hello",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.token,
        },
      })
        .then((response) => {
          this.helloMsg = response.data;
          console.log(response);
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
