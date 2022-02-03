<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <GamePad></GamePad>

  <!-- <el-dialog v-model="visible" :fullscreen="true"> </el-dialog> -->

  <!-- <Login></Login> -->
</template>
<script>
import "animate.css";
import GamePad from "./components/GamePad.vue";
// import Login from "./components/Login.vue";

export default {
  name: "AppTry",
  data() {
    return {
      visible: true,
    };
  },
  components: {
    GamePad,
    // Login,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: whitesmoke;
  /* margin-top: 60px; */
}
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: rgb(103, 171, 0);
}
</style>
