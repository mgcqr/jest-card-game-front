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
        <template v-for="obj in jest" :key="obj">
          <el-col :span="3"
            ><Card
              :cardControlObj="obj"
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
  <FinishPad
    :message="this.result"
    :idNameMapper="this.idNameMapper"
    @finish="finishHandler"
  ></FinishPad>
</template>

<script>
import Card from "./Card.vue";
import WebSocket from "./WebSocket.vue";
import FinishPad from "./FinishPad.vue";
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
      state: "Waiting",
      trophyObj: [],
      leftUser: null,
      rightUser: null,
      leftOffer: [],
      rightOffer: [],
      userOffer: [],
      jest: [],
      result: null,
      idNameMapper: [],
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
  components: { Card, WebSocket, FinishPad },
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
        } else if (message.user_id === this.leftUser.id) {
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
        console.log("takecard info");
        let anim = null;
        if (message.user_id === this.userInfo.id) {
          anim = "down";
          let card = getCard(message.card_name, this.userInfo.id);
          this.jest.push(card);
        } else if (message.user_id === this.leftUser.id) {
          anim = "left";
        } else if (message.user_id === this.rightUser.id) {
          anim = "right";
        }
        if (message.target_user_id === this.userInfo.id) {
          let index;
          for (let i = 0; i < 2; i++) {
            if (this.userOffer[i].faceUp) {
              index = i;
            }
          }
          if (this.userOffer[index].cardName !== message.card_name) {
            index = (index + 1) % 2;
          }
          let card = copyCard(this.userOffer[index]);
          card.animation = anim;
          card.choosable = false;
          card.show = false;
          this.userOffer[index] = card;
        } else if (message.target_user_id === this.leftUser.id) {
          let index;
          for (let i = 0; i < 2; i++) {
            if (this.leftOffer[i].faceUp) {
              index = i;
            }
          }
          if (this.leftOffer[index].cardName !== message.card_name) {
            index = (index + 1) % 2;
          }
          let card = copyCard(this.leftOffer[index]);
          card.animation = anim;
          card.choosable = false;
          card.show = false;
          this.leftOffer[index] = card;
        } else if (message.target_user_id === this.rightUser.id) {
          let index;
          for (let i = 0; i < 2; i++) {
            if (this.rightOffer[i].faceUp) {
              index = i;
            }
          }
          if (this.rightOffer[index].cardName !== message.card_name) {
            index = (index + 1) % 2;
          }
          let card = copyCard(this.rightOffer[index]);
          card.animation = anim;
          card.choosable = false;
          card.show = false;
          this.rightOffer[index] = card;
        }
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
    takeCardHandler(message) {
      this.state = "TakeCard";
      let availableOffers = message.available_offers;
      for (let target_user_id in availableOffers) {
        if (target_user_id === this.userInfo.id) {
          for (let i = 0; i < 2; i++) {
            let card = copyCard(this.userOffer[i]);
            card.choosable = true;
            this.userOffer[i] = card;
          }
        } else if (target_user_id === this.leftUser.id) {
          for (let i = 0; i < 2; i++) {
            let card = copyCard(this.leftOffer[i]);
            card.choosable = true;
            this.leftOffer[i] = card;
          }
        } else if (target_user_id === this.rightUser.id) {
          for (let i = 0; i < 2; i++) {
            let card = copyCard(this.rightOffer[i]);
            card.choosable = true;
            this.rightOffer[i] = card;
          }
        }
      }
    },
    resultHandler(message) {
      this.idNameMapper[this.userInfo.id] = this.userInfo.name;
      this.idNameMapper[this.leftUser.id] = this.leftUser.user_name;
      this.idNameMapper[this.rightUser.id] = this.rightUser.user_name;
      this.result = message;
    },
    finishHandler() {
      this.finishGame();
    },
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
        // console.log(ownerId + cardName + faceUp);
        let instructionDto = {
          type: "TakeCard",
          token: this.userInfo.token,
          is_face_up: faceUp,
          target_user_id: ownerId,
        };
        this.$refs.websocket.sendMessage(instructionDto);
      }

      this.state = "Waiting";
      this.clearShadow();
    },
    clearShadow() {
      //send an arbitrary object
      this.shadowClearFlag = { key: "val" };
    },

    click() {
      //this.state = "TakeOffer";
      let newObj = Object.assign({}, this.cardControlObj);
      newObj.cardName = "Spade1";
      newObj.animation = "down";
      newObj.show = false;
      newObj.choosable = false;

      let leftCard = this.leftOffer[0];
      let card = Object.assign({}, leftCard);
      card.cardName = "Diamond1";
      this.leftOffer[0] = card;

      let newLeftCard = {
        cardName: "Spade1",
        animation: "right",
        pop: false,
        show: false,
      };
      this.leftOffer[2] = newLeftCard;

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
