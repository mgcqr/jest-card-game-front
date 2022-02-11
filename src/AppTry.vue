<template>
  <WebSocket></WebSocket>
</template>
<script>
import "animate.css";
import WebSocket from "./components/WebSocket.vue";

export default {
  name: "AppTry",
  data() {
    return {};
  },
  components: {
    WebSocket,
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
  background-color: rgb(103, 171, 0);
}
</style>
