<template>
  <GamePad :gameId="gameId" :userInfo="userInfo" @finish="finishHandler"></GamePad>
  <WaitingHall
    :userInfo="this.userInfo"
    :visible="WaitingHallVisible"
    @joinGame="joinGameHandler"
  ></WaitingHall>
  <Login @loginReady="loginHandler"></Login>
</template>

<script>
import "animate.css";
import Login from "./components/Login.vue";
import GamePad from "./components/GamePad.vue";
import WaitingHall from "./components/WaitingHall.vue";

export default {
  name: "App",
  data() {
    return { userInfo: null, gameId: null, WaitingHallVisible: true };
  },
  components: {
    Login,
    GamePad,
    WaitingHall,
  },
  methods: {
    loginHandler(userInfo) {
      this.userInfo = userInfo;
      return true;
      //完成waitinghall的加载
    },
    joinGameHandler(gameId) {
      //console.log("App.vue logging: " + gameId);
      this.gameId = gameId;
      this.WaitingHallVisible = false;
      return true;
    },
    finishHandler() {
      this.gameId = null;
      this.WaitingHallVisible = true;
    },
  },
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: whitesmoke;
  /* margin-top: 60px; */
}
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-color: rgb(103, 171, 0);
}
</style>
