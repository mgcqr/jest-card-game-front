<template>
  <div></div>
</template>

<script>
export default {
  name: "Websocket",
  data() {
    return { socket: null, msgIn: null };
  },
  props: {
    userInfo: Object,
  },
  emits: {
    initial: null,
    info: null,
    makeoffer: null,
    takecard: null,
    result: null,
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
      this.socket.onopen = () => {
        console.log("websocket已打开");

        var initialInstructionDto = {
          type: "Initial",
          token: this.userInfo.token,
        };
        this.sendMessage(initialInstructionDto);
      };
      //获得消息事件
      this.socket.onmessage = (msg) => {
        var message = JSON.parse(msg.data);
        console.log(message);
        var typeArray = ["Initial", "Info", "MakeOffer", "TakeCard", "Result"];
        if (typeArray.includes(message.type)) {
          this.$emit(message.type.toLowerCase(), message);
        }
      };
      //关闭事件
      this.socket.onclose = () => {
        console.log("websocket已关闭");
      };
      //发生了错误事件
      this.socket.onerror = () => {
        console.log("websocket发生了错误");
      };
    },
    sendMessage(messageObj) {
      console.log(messageObj);
      this.socket.send(JSON.stringify(messageObj));
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
