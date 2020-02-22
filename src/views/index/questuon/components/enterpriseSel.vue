<template>
  <el-select v-model="selfEnterprise" placeholder="请选择企业">
    <el-option v-if="siQuery" label="所有企业" value></el-option>
    <el-option
      v-for="(item,index) in enterpriseList"
      :key="index"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>
<script>
import { enterpriseList } from "@/api/enterpise.js";
export default {
  props: {
    value: {
      type: [String, Number]
    },
    siQuery: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      //企业数据
      enterpriseList: "",
      selfEnterprise: this.value
    };
  },
  created() {
    //企业数据
    enterpriseList().then(res => {
      this.enterpriseList = res.data.items;
    });
  },
  //侦听器
  watch: {
    selfEnterprise() {
      this.$emit("input", this.selfEnterprise);
    }
  }
};
</script>