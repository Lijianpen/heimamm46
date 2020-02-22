<template>
  <el-cascader
    :props="{value :'label'}"
    size="large"
    :options="options"
    v-model="selfCity"
    @change="handleChange"
  ></el-cascader>
</template>
<script>
// 导入省市区数据
import { regionData } from "element-china-area-data";
export default {
  data() {
    return {
      //阶级选择器
      options: regionData,
      // 保存外部传递过来的数据
      selfCity: this.value
    };
  },

  methods: {
    handleChange(value) {
      // window.console.log(value);
      //通知父组件数据改变 并改变数据
      this.$emit("input", value);
    }
  }
};
</script>