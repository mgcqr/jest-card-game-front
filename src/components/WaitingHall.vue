<template>
  <el-dialog
    v-model="visiable"
    :fullscreen="true"
    :close-on-click-modal="false"
    :show-close="false"
    :close-on-press-escape="false"
  >
    <el-container>
      <el-header class="el-red-border"><p class="text">Active Game List</p></el-header>
      <el-main class="el-red-border">
        <el-scrollbar>
          <el-table
            :data="tableData"
            :border="true"
            highlight-current-row
            @current-change="handleCurrentChange"
          >
            <el-table-column prop="start_time" label="Start Time" width="200">
            </el-table-column>
            <el-table-column prop="description" label="Description"></el-table-column>
          </el-table>
        </el-scrollbar>
      </el-main>

      <el-footer class="el-red-border footer">
        <p>User Name : {{ userName }}</p>
        <el-button type="info" @click="getGameList">Refresh List</el-button>
        <el-button type="primary" @click="joinGame" :disabled="currentGameId == null"
          >Join Game</el-button
        >
      </el-footer>
    </el-container>
  </el-dialog>
</template>

<script>
import ResponseReader from "../util/ResponseReader";
export default {
  name: "WaitingHall",
  data() {
    return {
      currentGameId: null,
      userName: null,
      visiable: true,
      tableData: null,
      current: 1,
      size: 5,
    };
  },
  props: {
    userInfo: Object,
  },
  emits: {
    joinGame: null,
  },
  methods: {
    handleCurrentChange(currentRow) {
      this.currentGameId = currentRow.id;
    },
    getGameList() {
      var urlStr =
        "/api/waiting-hall/list?current=" + this.current + "&size=" + this.size;
      this.axios({
        method: "get",
        url: urlStr,
        headers: {
          "Content-Type": "application/json",
          Authorization: this.userInfo.token,
        },
      }).then((response) => {
        var payLoad = ResponseReader.getPayload(response);
        this.tableData = payLoad.records;
      });
    },
    joinGame() {
      this.$emit("joinGame", this.currentGameId);
    },
  },
  watch: {
    userInfo(newUserInfo) {
      if (newUserInfo.token != null) {
        this.userName = newUserInfo.name;
        this.getGameList();
      }
    },
  },
};
</script>

<style scoped>
/* .el-red-border {
  border-width: 1px;
  border-style: solid;
  border-color: red;
} */
.text {
  font-size: 20px;
}
.footer {
  text-align: right;
}
</style>
