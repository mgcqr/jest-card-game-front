<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <GetJoke></GetJoke>
  <LoginHello></LoginHello>
  <WebsocketDemo></WebsocketDemo>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import GetJoke from './components/GetJoke.vue'
import LoginHello from './components/LoginHello.vue'
import WebsocketDemo from './components/WebsocketDemo.vue'

export default {
  name: 'App',
  components: {
   // HelloWorld,
    GetJoke,
    LoginHello,
    WebsocketDemo
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
