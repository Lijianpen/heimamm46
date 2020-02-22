<template>
  <el-select v-model="selfSubject" placeholder="请选择学科">
    <el-option v-if="siQuery" label="所有学科" value></el-option>
    <el-option
      v-for="(item,index) in subjctList"
      :key="index"
      :label="item.short_name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>
<script>
import { subjectList } from "@/api/subject.js";
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
      //学科
      subjctList: [],
      //   内部选中的学科
      selfSubject: this.value
    };
  },
  created() {
    //   获取学科数据
    subjectList().then(res => {
      //   window.console.log(res);
      this.subjctList = res.data.items;
    });
  },
  //监听数据
  watch: {
    selfSubject() {
      this.$emit("input", this.selfSubject);
    }
  }
};
</script>