<template>
  <el-container class="el-container">
    <el-main class="el-container">
      <el-row>
        <el-col :span="3">
          <Card cardName="CardBack"></Card>
          <Card cardName="CardBack"></Card>
        </el-col>
        <el-col :span="18"></el-col>
        <el-col :span="3">
          <Card cardName="CardBack"></Card>
          <Card cardName="CardBack"></Card>
        </el-col>
      </el-row>
    </el-main>

    <el-footer height="auto">
      <el-row>
        <el-col :span="3"><Card cardName="CardBack"></Card></el-col>
        <el-col :span="3"><Card cardName="CardBack"></Card></el-col>
        <el-col :span="4"></el-col>
        <el-col :span="1"><Card cardName="Heart2" animation="test" pop></Card></el-col>
        <el-col :span="1"><Card cardName="Heart2" animation="TEST" pop></Card></el-col>
        <el-col :span="1"><Card cardName="Heart2" pop></Card></el-col>
        <el-col :span="1"><Card cardName="Heart2" pop></Card></el-col>
        <el-col :span="1"><Card cardName="Heart2" pop></Card></el-col>
        <el-col :span="1"><Card cardName="Heart2" pop></Card></el-col>
        <el-col :span="1"><Card cardName="Heart2" pop></Card></el-col>
        <el-col :span="1"><Card cardName="Heart2" pop></Card></el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
import Card from "./Card.vue";

export default {
  components: { Card },
};
</script>

<style>
.el-container {
  border-width: 1px;
  border-style: solid;
  border-color: red;
  height: 800px;
}
</style>
