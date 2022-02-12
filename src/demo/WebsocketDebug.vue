<template>
  <div>
    <div><button @click="openSocket">开启socket</button></div>
    <div><textarea v-model="msg"></textarea></div>
    <div><button @click="sendMessage">发送消息</button></div>
    <div><button @click="closeSocket">关闭socket</button></div>
  </div>
</template>

<script>
import WebSocket from "../util/WebSocket";
export default {
  name: "WebsocketDeBug",
  data() {
    return { msg: null };
  },
  methods: {
    openSocket() {
      WebSocket.openSocket();
    },
    sendMessage() {
      var obj = JSON.parse(this.msg);
      WebSocket.sendMessage(obj);
    },
    closeSocket() {
      WebSocket.closeSocket();
    },
  },
};
</script>

<style></style>
