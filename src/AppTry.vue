<template>
  <GetJoke ref="GetJoke"></GetJoke>
  <button @click="clickhan">asdasd</button>
</template>
<script>
import "animate.css";
import GetJoke from "./demo/GetJoke.vue";

export default {
  name: "AppTry",
  data() {
    return {};
  },
  components: {
    GetJoke,
  },
  methods: {
    clickhan() {
      this.$refs.GetJoke.load();
    },
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
