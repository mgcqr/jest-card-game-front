<template>
  <el-container class="el-red-border pad">
    <el-main class="el-red-border">
      <el-row>
        <el-col :span="3">
          <template v-for="obj in leftJest" :key="obj">
            <Card :cardControlObj="obj"></Card>
          </template>
        </el-col>
        <el-col :span="18"></el-col>
        <el-col :span="3">
          <Card :cardControlObj="this.cardControlObj"></Card>
          <Card :cardControlObj="this.cardControlObj"></Card>
        </el-col>
      </el-row>
    </el-main>

    <el-footer height="auto">
      <el-row>
        <el-col :span="3"><Card :cardControlObj="this.cardControlObj"></Card></el-col>
        <el-col :span="3"><Card :cardControlObj="this.cardControlObj"></Card></el-col>
        <el-col :span="3">
          <button @click="click">button</button>
        </el-col>
        <el-col :span="3"><Card :cardControlObj="this.cardControlObj"></Card></el-col>
        <el-col :span="3"><Card :cardControlObj="this.cardControlObj"></Card></el-col>
        <el-col :span="3"><Card :cardControlObj="this.cardControlObj"></Card></el-col>
        <el-col :span="3"><Card :cardControlObj="this.cardControlObj"></Card></el-col>
        <el-col :span="3"><Card :cardControlObj="this.cardControlObj"></Card></el-col>
      </el-row>
    </el-footer>
  </el-container>

  <el-dialog
    v-model="dialogVisible"
    title="Joing Game"
    width="30%"
    :close-on-click-modal="false"
    :show-close="false"
    :close-on-press-escape="false"
  >
    <span><p>Waiting other players</p></span>

    <template #footer>
      <el-button type="danger" @click="exit">Exit</el-button>
    </template>
  </el-dialog>

  <WebSocket
    ref="websocket"
    :userInfo="this.userInfo"
    @Initial="initialHandler"
    @Info="infoHandler"
    @MakeOffer="makeOfferHandler"
    @TakeCard="takeCardHandler"
    @Result="resultHandler"
  ></WebSocket>
</template>

<script>
import Card from "./Card.vue";
import WebSocket from "./WebSocket.vue";
export default {
  name: "GamePad",
  data() {
    return {
      dialogVisible: false,
      leftUser: null,
      rightUser: null,
      trophy: null,
      cardControlObj: {
        cardName: "joker",
        animation: "test",
        pop: false,
        show: true,
      },
      leftJest: [
        {
          cardName: "Heart1",
          animation: "test",
          pop: false,
          show: true,
        },
        {
          cardName: "Heart2",
          animation: "test",
          pop: true,
          show: true,
        },
      ],
    };
  },
  props: {
    gameId: String,
    userInfo: Object,
    token: String,
  },
  emits: {
    finish: null,
  },
  components: { Card, WebSocket },
  methods: {
    joinGame() {
      //console.log("gamepad joining game" + this.gameId);
      this.dialogVisible = true;
      this.$refs.websocket.openSocket();
    },
    exit() {
      var dto = {
        id: this.gameId,
      };
      this.axios({
        method: "delete",
        url: "/api/waiting-hall/quit_game",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.userInfo.token,
        },
        data: dto,
      });
      this.dialogVisible = false;
      this.finishGame();
    },
    finishGame() {
      this.$emit("finish");
    },
    initialHandler(message) {
      this.leftUser = message.leftUser;
      this.rightUser = message.rightUser;
      this.trophy = message.trophy;
      this.dialogVisible = false;
    },
    infoHandler() {},
    makeOfferHandler() {},
    takeCardHandler() {},
    resultHandler() {},

    click() {
      var newObj = Object.assign({}, this.cardControlObj);
      newObj.cardName = "Heart1";
      newObj.animation = "TEST";
      newObj.show = false;

      this.cardControlObj = newObj;
    },
  },
  watch: {
    gameId(newGameId) {
      if (newGameId != null) {
        this.joinGame();
      }
    },
    trophy() {},
  },
};
</script>

<style scoped>
.el-red-border {
  border-width: 1px;
  border-style: solid;
  border-color: red;
}

.pad {
  height: 100%;
  margin: 0px;
  padding: 0px;
}
</style>
