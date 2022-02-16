<template>
  <div>
    <div><button @click="openSocket">开启socket</button></div>
    <div><textarea v-model="msgIn"></textarea></div>
    <div><button @click="sendMessage">发送消息</button></div>
    <div><button @click="closeSocket">关闭socket</button></div>
  </div>
</template>

<script>
export default {
  name: "WebsocketDebug",
  data() {
    return { socket: null, msgIn: null };
  },
  methods: {
    openSocket() {
      //URL的代理写法
      var socketUrl = "ws://" + location.host + "/socket/webSocket";

      console.log(socketUrl);
      if (this.socket != null) {
        this.socket.close();
        this.socket = null;
      }

      //创建连接
      this.socket = new WebSocket(socketUrl);
      //打开事件
      this.socket.onopen = function () {
        console.log("websocket已打开");
      };
      //获得消息事件
      this.socket.onmessage = function (msg) {
        // var serverMsg = "收到服务端信息：" + msg.data;
        console.log(JSON.parse(msg.data));
      };
      //关闭事件
      this.socket.onclose = function () {
        console.log("websocket已关闭");
      };
      //发生了错误事件
      this.socket.onerror = function () {
        console.log("websocket发生了错误");
      };
    },
    // sendMessage(messageObj) {
    //   console.log(messageObj);
    //   this.socket.send(JSON.stringify(messageObj));
    // },
    sendMessage() {
      console.log(this.msgIn);
      this.socket.send(this.msgIn);
    },
    closeSocket() {
      this.socket.close();
    },
  },
  watch: {},
  beforeCreate() {
    if (typeof WebSocket == "undefined") {
      console.log("您的浏览器不支持WebSocket");
      Window.alert("WebSocket is not surported on this browser.");
    }
  },
};
</script>

<style></style>
