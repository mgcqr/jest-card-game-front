<template>
  <div>
    <el-button @click="load">GetJoke</el-button>
    <p>{{ info }}</p>
  </div>
</template>

<script>
export default {
  name: "GetJoke",
  data() {
    return {
      info: null,
    };
  },
  emits: {
    //自定义事件
    loadReadyEvent: null,
  },
  methods: {
    async load() {
      //同步方法
      await this.axios({
        method: "get",
        url: "/joke",
      })
        .then((response) => {
          this.info = response.data;
          console.log(response);
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });

      this.$emit("loadReadyEvent"); //触发自定义事件
    },
  },
};
</script>

<style></style>
