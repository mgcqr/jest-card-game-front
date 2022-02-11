<template>
  <div>
    <div><button @click="openSocket">开启socket</button></div>
    <div><button @click="sendMessage">发送消息</button></div>
    <div><button @click="closeSocket">关闭socket</button></div>
  </div>
</template>

<script>
import WebSocket from "../util/WebSocket";
export default {
  name: "Websocket",
  data() {
    return {};
  },
  methods: {
    openSocket() {
      WebSocket.openSocket();
    },
    sendMessage() {
      WebSocket.sendMessage();
    },
    closeSocket() {
      WebSocket.closeSocket();
    },
  },
};
</script>

<style></style>
