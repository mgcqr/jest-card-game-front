<template>
  <button @click="handler">change anim</button>
  <button @click="show = !show">show</button>
  <Card cardName="Heart2" :animation="anim" v-if="show" />
</template>
<script>
import "animate.css";
import Card from "./components/Card.vue";

export default {
  name: "AppTry",
  data() {
    return { anim: "test", show: true };
  },
  components: {
    Card,
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
