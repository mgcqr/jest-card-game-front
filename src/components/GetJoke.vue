<template>
  <div class="demo">
    <button @click="load">GetJoke</button>
    <p>{{info}}</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'GetJoke',
  data(){
    return{
      info : null
    }
  },
  methods:{
    load () {
      axios
        //.get('https://autumnfish.cn/api/joke')
        //.get('http://localhost:8081/home/hello')
        .get('/joke')
        .then(
          response => {
            this.info=response.data
            console.log(response)
          }
        )
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });
    }
  }
}
</script>

<style>
</style>
