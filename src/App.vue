<template>
  <AppTry></AppTry>
</template>

<script>
import AppTry from './AppTry.vue'

export default {
  name: 'App',
  components: {
   AppTry
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
