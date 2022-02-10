<template>
  <el-dialog
    v-model="listVisible"
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

        <div class="pagination-block">
          <el-pagination
            background
            layout="prev, pager, next, sizes"
            :total="total"
            :page-sizes="[5, 10, 15]"
            v-model:page-size="size"
            v-model:current-page="current"
          ></el-pagination>
        </div>
      </el-main>

      <el-footer class="el-red-border footer">
        <p>User Name : {{ userName }}</p>
        <el-button type="info" @click="newGameDialogVisible = true" plain
          >New Game</el-button
        >
        <el-button type="info" @click="getGameListFirstPage">Refresh List</el-button>
        <el-button type="primary" @click="joinGame" :disabled="currentGameId == null"
          >Join Game</el-button
        >
      </el-footer>
    </el-container>

    <el-dialog
      v-model="newGameDialogVisible"
      title="New Game"
      width="30%"
      :append-to-body="true"
    >
      <el-input v-model="inputDescription" placeholder="Game description" />
      <template #footer>
        <el-button type="primary" @click="newGame">Confirm</el-button>
      </template>
    </el-dialog>
  </el-dialog>
</template>

<script>
import ResponseReader from "../util/ResponseReader";
export default {
  name: "WaitingHall",
  data() {
    return {
      listVisible: true,
      inputDescription: null,
      newGameDialogVisible: false,
      currentGameId: null,
      userName: null,
      tableData: null,

      current: 1,
      size: 5,
      total: 0,
    };
  },
  props: {
    userInfo: Object,
    visible: Boolean,
  },
  emits: {
    joinGame: null,
  },
  methods: {
    handleCurrentChange(currentRow) {
      if (currentRow != null) {
        this.currentGameId = currentRow.id;
      }
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
        this.total = payLoad.total;
      });
    },
    getGameListFirstPage() {
      this.current = 1;
      this.getGameList();
    },
    joinGame() {
      var dto = {
        id: this.currentGameId,
      };
      this.axios({
        method: "put",
        url: "/api/waiting-hall/join_game/",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.userInfo.token,
        },
        data: dto,
      });
      this.$emit("joinGame", this.currentGameId);
    },
    newGame() {
      if (this.inputDescription == null) return;
      var urlStr = "/api/waiting-hall/new-game/" + this.inputDescription;
      this.axios({
        method: "post",
        url: urlStr,
        headers: {
          "Content-Type": "application/json",
          Authorization: this.userInfo.token,
        },
      });

      this.getGameListFirstPage();
      this.newGameDialogVisible = false;
    },
  },
  watch: {
    userInfo(newUserInfo) {
      if (newUserInfo.token != null) {
        this.userName = newUserInfo.name;
        this.getGameListFirstPage();
      }
    },
    visible(newVisible) {
      this.listVisible = newVisible;
      this.getGameListFirstPage();
    },
    current() {
      this.getGameList();
    },
    size() {
      this.getGameList();
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
.pagination-block {
  margin-top: 10px;
}
</style>
