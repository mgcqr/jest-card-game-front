<template>
  <el-popover placement="top" width="auto" trigger="hover" :disabled="!pop">
    <template #reference>
      <transition :appear="true" :name="animation">
        <el-card
          class="box-card animate__animated"
          :body-style="{ padding: '0px' }"
          v-show="show"
          @click="clickHandler"
        >
          <img :src="imageSrc" class="image" />
        </el-card>
      </transition>
    </template>
    <img :src="popImageSrc" class="image" />
  </el-popover>
</template>

<script>
export default {
  name: "Card",
  data() {
    return {
      imageSrc: null,
      popImageSrc: null,

      cardName: null,
      animation: null,
      pop: false,
      show: true,
      faceUp: true,
      choosable: false,
      ownerId: null,
    };
  },
  props: {
    cardControlObj: Object,
  },
  emits: {
    choose: null,
  },
  methods: {
    refresh(controlObj) {
      if (controlObj == null) return;
      this.cardName = controlObj.cardName;
      this.animation = controlObj.animation;
      this.pop = controlObj.pop;
      this.show = controlObj.show;
      this.faceUp = controlObj.faceUp;
      this.choosable = controlObj.choosable;
      this.ownerId = controlObj.ownerId;

      if (this.cardName != null && this.cardName != undefined) {
        this.popImageSrc = require("../assets/card-img/" + this.cardName + ".png");
      }

      if (this.faceUp && this.cardName != null && this.cardName != undefined) {
        this.imageSrc = require("../assets/card-img/" + this.cardName + ".png");
      } else {
        this.imageSrc = require("../assets/card-img/CardBack.png");
      }
    },
    clickHandler() {
      if (this.choosable) {
        this.$emit("choose", this.ownerId, this.cardName, this.faceUp);
      }
    },
  },
  watch: {
    cardControlObj(newCardControlObj) {
      this.refresh(newCardControlObj);
    },
  },
  mounted() {
    this.refresh(this.cardControlObj);
  },
};
</script>

<style scoped>
.box-card {
  /* 截图截出来是156*207 */
  width: 156px;
  height: 207px;
}

.test-enter-active {
  animation: bounceIn; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 1s; /* don't forget to set a duration! */
}
.v-leave-active {
  animation: backOutLeft; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 1s; /* don't forget to set a duration! */
}
.TEST-leave-active {
  animation: backOutUp; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 1s; /* don't forget to set a duration! */
}
</style>
