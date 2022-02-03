<template>
  <el-popover placement="top" width="auto" trigger="hover" :disabled="!pop">
    <template #reference>
      <transition :appear="true" :name="animation">
        <el-card class="box-card animate__animated" :body-style="{ padding: '0px' }">
          <img :src="imageSrc" class="image" />
        </el-card>
      </transition>
    </template>
    <img :src="imageSrc" class="image" />
  </el-popover>
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
    animation: String,
    pop: Boolean,
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
.TEST-enter-active {
  animation: backInDown; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 1s; /* don't forget to set a duration! */
}
</style>
