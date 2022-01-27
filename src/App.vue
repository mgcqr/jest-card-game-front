<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <GetJoke @load-ready-event="fatherFun"></GetJoke>
  <!-- 只有父组件接受子组件定义的事件只能绑定在子组件上 -->
  <LoginHello></LoginHello>
  <WebsocketDemo></WebsocketDemo>
  <el-button>Default</el-button>
  <el-button type="primary">Primary</el-button>
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
  },
  methods:{
    fatherFun(){
      console.log('load ready')
    }
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
