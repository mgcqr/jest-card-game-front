<template>
<div>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Card name</span>
        <el-button class="button" type="text">Operation button</el-button>
      </div>
    </template>
    <div id="login">
      <button @click="login">login</button>
      <p>{{loginMsg}}</p>

      <button @click='hello'>hello</button>
      <p>{{helloMsg}}</p>
    </div>
  </el-card>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name:'LoginHello',
  data(){
    return{
      loginMsg : null,
      helloMsg : null,
      token : null
    }
  },
  methods:{
    login(){
      let postData = {
        userName: 'mgcqr',
        passWord: '123456'
      }
      axios({
        method : 'post',
        url : '/api/login',
        headers: { 
          'Content-Type' : 'application/json',
        },
        data: postData
      })
      .then(
        response => {
          this.loginMsg=response.data;
          this.token = response.data.token;
          console.log(response);
        }
      )
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });

    },
    hello(){
      axios({
        method : 'get',
        url : '/api/hello',
        headers: { 
          'Content-Type' : 'application/json',
          'Authorization' : this.token
        }
      })
      .then(
        response => {
          this.helloMsg=response.data
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

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
  /* margin: 0 auto; */
}
</style>