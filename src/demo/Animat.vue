<template>
  <div>
    <el-button @click="show">show</el-button>
    <hr />

    <el-row>
      <el-col :span="3">
        <Card v-show="isShow" cardName="CardBack"></Card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import "animate.css";
import Card from "../components/Card.vue";

export default {
  name: "Animate",
  data() {
    return {
      isShow: true,
    };
  },
  components:{
    Card,
  },
  methods: {
    show() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style scoped>
.box-card {
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

/* .image {
  width: 100%;
  display: block;
} */
</style>
