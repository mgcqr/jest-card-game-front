<template>
  <el-container class="el-red-border pad">
    <el-main class="el-red-border">
      <el-row>
        <el-col :span="3">
          <template v-for="obj in leftOffer" :key="obj">
            <Card
              :cardControlObj="obj"
              :shadowClearFlag="this.shadowClearFlag"
              @choose="cardChosenHandler"
            ></Card>
          </template>
        </el-col>
        <el-col :span="18">
          <el-row justify="space-around">
            <el-col :span="4">
              <Card
                :cardControlObj="this.trophyObj[0]"
                :shadowClearFlag="this.shadowClearFlag"
                @choose="cardChosenHandler"
              ></Card>
            </el-col>
            <el-col :span="4"
              ><Card
                :cardControlObj="{
                  cardName: 'logo',
                  animation: null,
                  pop: false,
                  show: true,
                  faceUp: true,
                }"
              ></Card
            ></el-col>
            <el-col :span="4">
              <Card
                :cardControlObj="this.trophyObj[1]"
                :shadowClearFlag="this.shadowClearFlag"
                @choose="cardChosenHandler"
              ></Card>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="3">
          <template v-for="obj in rightOffer" :key="obj">
            <Card
              :cardControlObj="obj"
              :shadowClearFlag="this.shadowClearFlag"
              @choose="cardChosenHandler"
            ></Card>
          </template>
        </el-col>
      </el-row>
    </el-main>

    <el-footer height="auto">
      <el-row>
        <template v-for="obj in userOffer" :key="obj">
          <el-col :span="3"
            ><Card
              :cardControlObj="obj"
              :shadowClearFlag="this.shadowClearFlag"
              @choose="cardChosenHandler"
            ></Card
          ></el-col>
        </template>
        <el-col :span="3"> {{ state }} <button @click="click">button</button></el-col>
        <template v-for="obj in 5" :key="obj">
          <el-col :span="3"
            ><Card
              :cardControlObj="this.cardControlObj"
              :shadowClearFlag="this.shadowClearFlag"
              @choose="cardChosenHandler"
            ></Card
          ></el-col>
        </template>
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
    @initial="initialHandler"
    @info="infoHandler"
    @makeoffer="makeOfferHandler"
    @takecard="takeCardHandler"
    @result="resultHandler"
  ></WebSocket>
</template>

<script>
import Card from "./Card.vue";
import WebSocket from "./WebSocket.vue";
const basicCardObj = {
  cardName: null,
  animation: null,
  ownerId: null,
  pop: false,
  show: true,
  faceUp: false,
  choosable: false,
};
function copyCard(src) {
  return Object.assign({}, src);
}
function getCard(cardName, ownerId) {
  var card = copyCard(basicCardObj);
  card.cardName = cardName;
  card.ownerId = ownerId;
  card.faceUp = true;
  return card;
}
export default {
  name: "GamePad",
  data() {
    return {
      dialogVisible: false,
      shadowClearFlag: null,
      state: null,
      trophyObj: [
        {
          cardName: "Heart1",
          animation: "test",
          pop: false,
          show: true,
          faceUp: true,
          ownerId: null,
          choosable: true,
        },
        {
          cardName: "Heart2",
          animation: "test",
          pop: true,
          show: true,
          faceUp: true,
          ownerId: null,
          choosable: false,
        },
      ],

      cardControlObj: {
        cardName: "joker",
        animation: "test",
        pop: false,
        show: true,
        faceUp: true,
        ownerId: null,
        choosable: false,
      },

      leftUser: null,
      rightUser: null,
      leftOffer: [
        {
          cardName: "Heart1",
          animation: "test",
          pop: false,
          show: true,
          faceUp: true,
          ownerId: null,
          choosable: true,
        },
        {
          cardName: "Heart2",
          animation: "test",
          pop: true,
          show: true,
          faceUp: true,
          ownerId: null,
          choosable: false,
        },
      ],
      rightOffer: [
        {
          cardName: "Heart1",
          animation: "test",
          pop: false,
          show: true,
          faceUp: true,
          ownerId: null,
          choosable: false,
        },
        {
          cardName: "Heart2",
          animation: "test",
          pop: true,
          show: true,
          faceUp: true,
          choosable: false,
        },
      ],
      userOffer: [
        {
          cardName: "Heart1",
          animation: "test",
          pop: false,
          show: false,
          faceUp: true,
          ownerId: null,
          choosable: false,
        },
        {
          cardName: "Heart2",
          animation: "test",
          pop: true,
          show: false,
          faceUp: true,
          ownerId: null,
          choosable: false,
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
      let dto = {
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
      this.state = "Initial";

      this.leftUser = message.left_user;
      this.rightUser = message.right_user;
      let trophy = message.trophy;
      for (let i = 0; i < 2; i++) {
        this.trophyObj[i] = getCard(trophy[i]);
      }

      this.dialogVisible = false;
    },
    infoHandler(message) {
      if (message.operation === "MakeOffer") {
        if (message.user_id === this.userInfo.id) {
          for (let i = 0; i < 2; i++) {
            if (this.userOffer[i].cardName != message.card_name) {
              let card = getCard(this.userOffer[i].cardName, this.userInfo.id);
              card.faceUp = false;
              card.pop = true;
              this.userOffer[i] = card;
            }
          }
        }
        if (message.user_id === this.leftUser.id) {
          this.leftOffer[0] = getCard(message.card_name, message.user_id);
          let cardDown = copyCard(basicCardObj);
          cardDown.ownerId = message.user_id;
          this.leftOffer[1] = cardDown;
        } else if (message.user_id === this.rightUser.id) {
          this.rightOffer[0] = getCard(message.card_name, message.user_id);
          let cardDown = copyCard(basicCardObj);
          cardDown.ownerId = message.user_id;
          this.rightOffer[1] = cardDown;
        }
      } else if (message.operation === "TakeCard") {
        return;
      }
    },
    makeOfferHandler(message) {
      this.state = "MakeOffer";
      for (let i = 0; i < 2; i++) {
        let card = getCard(message.offer_card_names[i], this.userInfo.id);
        card.choosable = true;
        this.userOffer[i] = card;
      }
    },
    takeCardHandler() {},
    resultHandler() {},
    cardChosenHandler(ownerId, cardName, faceUp) {
      console.log("ChosenHandler");
      if (this.state === "MakeOffer") {
        let instructionDto = {
          type: "MakeOffer",
          token: this.userInfo.token,
          card_name: cardName,
        };
        this.$refs.websocket.sendMessage(instructionDto);
      } else if (this.state === "TakeCard") {
        console.log(ownerId + cardName + faceUp);
      }

      //send an arbitrary boject
      this.shadowClearFlag = { key: "val" };
    },

    click() {
      //this.state = "TakeOffer";
      let newObj = Object.assign({}, this.cardControlObj);
      newObj.cardName = "Spade1";
      newObj.animation = "TEST";
      newObj.show = false;
      newObj.choosable = false;

      // let leftCard = this.leftOffer[0];
      // let card = Object.assign({}, leftCard);
      // card.cardName = "Diamond1";
      // this.leftOffer[0] = card;

      // let newLeftCard = {
      //   cardName: "Spade1",
      //   animation: "test",
      //   pop: false,
      //   show: true,
      // };
      // this.leftOffer[2] = newLeftCard;

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
