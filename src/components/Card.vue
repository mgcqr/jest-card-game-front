<template>
  <transition :appear="true">
    <el-card class="box-card animate__animated" :body-style="{ padding: '0px' }">
      <img :src="imageSrc" class="image" />
    </el-card>
  </transition>
</template>

<script>
export default {
  name: "Card",
  data() {
    return {
      imageSrc: require("../assets/card-img/" + this.cardName + ".png"),
    };
  },
  props: {
    cardName: String,
  },
};
</script>

<style scoped>
.box-card {
  /* 截图截出来是156*207 */
  width: 156px;
}

.v-enter-active {
  animation: bounceIn; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 2s; /* don't forget to set a duration! */
}
.v-leave-active {
  animation: backOutLeft; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 2s; /* don't forget to set a duration! */
}
</style>
