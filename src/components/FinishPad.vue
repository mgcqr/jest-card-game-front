<template>
  <el-dialog
    v-model="visible"
    title="Game Result"
    width="100%"
    :close-on-click-modal="false"
    :show-close="false"
    :close-on-press-escape="false"
  >
    <template v-for="res in this.message.results" :key="res" class="test">
      <p>{{ this.idNameMapper[res.user_id] }}</p>

      <p>Score: {{ res.score }}</p>
      <el-row justify="space-around">
        <template v-for="card in res.jest_card_names" :key="card">
          <el-col :span="3">
            <Card
              :cardControlObj="{
                cardName: card,
                animation: null,
                ownerId: null,
                pop: false,
                show: true,
                faceUp: true,
                choosable: false,
              }"
            ></Card>
          </el-col>
        </template>
      </el-row>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="click">Exit</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import Card from "./Card.vue";
export default {
  name: "FinishPad",
  data() {
    return {
      visible: false,
    };
  },
  components: {
    Card,
  },
  methods: {
    click() {
      this.visible = false;
      this.$emit("finish");
    },
  },
  props: {
    message: Object,
    idNameMapper: Object,
  },
  emits: {
    finish: null,
  },
  watch: {
    message() {
      this.visible = true;
    },
  },
};
</script>

<style scoped>
.text {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(0, 0, 0);
  /* margin-top: 60px; */
}
</style>
