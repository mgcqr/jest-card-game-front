<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-main>
        <Card cardName="CardBack"></Card>
        <Card cardName="CardBack"></Card>
      </el-main>
      <el-main>middle</el-main>
      <el-main>
        <Card cardName="CardBack"></Card>
        <Card cardName="CardBack"></Card>
      </el-main>
    </el-container>
    
    <el-footer>
      <el-row>
        <el-col :span="3"><Card cardName="CardBack"></Card></el-col>
        <el-col :span="3"><Card cardName="CardBack"></Card></el-col>
        <el-col :span="3"><Card cardName="CardBack"></Card></el-col>
        <el-col :span="3"><Card cardName="CardBack"></Card></el-col>
        <el-col :span="3"><Card cardName="CardBack"></Card></el-col>
        <el-col :span="3"><Card cardName="CardBack"></Card></el-col>
        <el-col :span="3"><Card cardName="CardBack"></Card></el-col>
        <el-col :span="3"><Card cardName="CardBack"></Card></el-col>
      </el-row>

    </el-footer>
  </el-container>
</template>

<script>
import Card from "./Card.vue";
//import Card from "./Card.vue"
export default {
    components: { Card }
}
</script>

<style>

</style>