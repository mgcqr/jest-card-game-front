<template>
  <img alt="Vue logo" src="./assets/logo.png" />

  <GetJoke
    @load-ready-event="fatherFun"
    class="animate__animated animate__bounce"
  ></GetJoke>

  <!-- <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-main>left</el-main>
        <el-main>right</el-main>
      </el-container>
    </el-container>
  </el-container> -->
</template>

<script>
import GetJoke from "./demo/GetJoke.vue";
import "animate.css";

export default {
  name: "AppTry",
  components: {
    GetJoke,
  },
};
</script>

<style></style>
