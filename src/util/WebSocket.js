var socket = null;
export default {
  openSocket() {
    if(typeof(WebSocket) == "undefined") {
      console.log("您的浏览器不支持WebSocket");
      return
    }
    console.log("您的浏览器支持WebSocket");
    //URL的代理写法
    var socketUrl='ws://'+ location.host + "/socket/webSocket";

    console.log(socketUrl);
    if(socket!=null){
      socket.close();
      socket=null;
    }

    //创建连接
    socket = new WebSocket(socketUrl);
    //打开事件
    socket.onopen = function() {
      console.log("websocket已打开");
    };
    //获得消息事件
    socket.onmessage = function(msg) {
      var serverMsg = "收到服务端信息：" + msg.data;
      console.log(serverMsg);
    };
    //关闭事件
    socket.onclose = function() {
      console.log("websocket已关闭");
    };
    //发生了错误事件
    socket.onerror = function() {
      console.log("websocket发生了错误");
    }
  },
  sendMessage(message) {
    if(typeof(WebSocket) == "undefined") {
      console.log("您的浏览器不支持WebSocket");
      return
    }
    console.log(message);
    socket.send(JSON.stringify(message));
    
  },
  closeSocket(){
    if(typeof(WebSocket) == "undefined") {
        console.log("您的浏览器不支持WebSocket");
    }else {
        socket.close();
    }
  }
}