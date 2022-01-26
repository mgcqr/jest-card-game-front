<template>
  <div>
    <h3>hello socket</h3>

    <p>userId</p>
    <div><input id="userId" name="userId" type="text" value="10"></div>

    <p>toUserId</p>
    <div><input id="toUserId" name="toUserId" type="text" value="20"></div>

    <p>contentText</p>
    <div><input id="contentText" name="contentText" type="text" value="hello websocket"></div>

    <p></p>
    <div><button @click="openSocket">开启socket</button></div>
    <div><button @click="sendMessage">发送消息</button></div>
    <div><button @click="closeSocket">关闭socket</button></div>
  </div>
</template>

<script>
export default {
    name:'WebsocketDemo',
    data(){
      return{
        socket: null
      }
    },
    methods:{
      openSocket() {
        if(typeof(WebSocket) == "undefined") {
          console.log("您的浏览器不支持WebSocket");
        }else{
          console.log("您的浏览器支持WebSocket");
          //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
          var userId = document.getElementById('userId').value;
          console.log(userId)

          //URL的代理写法
          var socketUrl='ws://'+ location.host + "/socket/webSocket/"+userId;
          //var socketUrl="ws://127.0.0.1:8081/webSocket/"+userId;

          console.log(socketUrl);
          if(this.socket!=null){
            this.socket.close();
            this.socket=null;
          }

          //创建连接
          this.socket = new WebSocket(socketUrl);//, 'FF-FF-EE');
          //打开事件
          this.socket.onopen = function() {
            console.log("websocket已打开");
            //socket.send("这是来自客户端的消息" + location.href + new Date());
          };
          //获得消息事件
          this.socket.onmessage = function(msg) {
            var serverMsg = "收到服务端信息：" + msg.data;
            console.log(serverMsg);
            //发现消息进入    开始处理前端触发逻辑
          };
          //关闭事件
          this.socket.onclose = function() {
            console.log("websocket已关闭");
          };
          //发生了错误事件
          this.socket.onerror = function() {
            console.log("websocket发生了错误");
          }
        }
      },
      sendMessage() {
        if(typeof(WebSocket) == "undefined") {
          console.log("您的浏览器不支持WebSocket");
        }else {
          // console.log("您的浏览器支持WebSocket");
          var toUserId = document.getElementById('toUserId').value;
          var contentText = document.getElementById('contentText').value;
          var msg = '{"toUserId":"'+toUserId+'","contentText":"'+contentText+'"}';
          console.log(msg);
          this.socket.send(msg);
        }
      },
      closeSocket(){
        if(typeof(WebSocket) == "undefined") {
            console.log("您的浏览器不支持WebSocket");
        }else {
            this.socket.close();
        }
      }
    }

}
</script>

<style>

</style>