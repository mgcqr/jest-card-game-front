<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <GetJoke @load-ready-event="fatherFun"></GetJoke>
  <!-- 只有父组件接受子组件定义的事件只能绑定在子组件上 -->
  <LoginHello></LoginHello>
  <WebsocketDemo></WebsocketDemo>

  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-main>left</el-main>
        <el-main>right</el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import GetJoke from "./components/playground/GetJoke.vue";
import LoginHello from "./components/playground/LoginHello.vue";
import WebsocketDemo from "./components/playground/WebsocketDemo.vue";

export default {
  name: "AppTry",
  components: {
    // HelloWorld,
    GetJoke,
    LoginHello,
    WebsocketDemo,
  },
  methods: {
    fatherFun() {
      console.log("load ready");
    },
  },
};
</script>

<style></style>
