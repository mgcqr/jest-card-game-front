<template>
  <WebsocketDebug></WebsocketDebug>
</template>
<script>
import "animate.css";
import WebsocketDebug from "./demo/WebsocketDebug.vue";

export default {
  name: "AppTry",
  data() {
    return {};
  },
  components: {
    WebsocketDebug,
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
  width: 100%;
  /* background-color: rgb(103, 171, 0); */
}
</style>
