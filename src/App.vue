<template>
  <GamePad></GamePad>
  <el-dialog v-model="visiable" :fullscreen="true"> </el-dialog>
  <Login @tokenReady="tokenHandler"></Login>
</template>

<script>
import "animate.css";
import Login from "./components/Login.vue";
import GamePad from "./components/GamePad.vue";

export default {
  name: "App",
  data() {
    return { visiable: true, token: null };
  },
  components: {
    Login,
    GamePad,
  },
  methods: {
    tokenHandler(token) {
      this.token = token;
      console.log(this.token);
    },
  },
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
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
  width: 100%;
  background-color: rgb(103, 171, 0);
}
</style>
