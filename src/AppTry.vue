<template>
  <GamePad></GamePad>
</template>
<script>
import "animate.css";
import GamePad from "./components/GamePad.vue";

export default {
  name: "AppTry",
  components: {
    GamePad,
  },
  methods: {
    handler() {
      this.anim = "TEST";
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
  background-color: rgb(68, 110, 4);
}
</style>
