<template>
  <el-card class="box-card">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="学科编号">
        <el-input class="short" v-model="formInline.user" placeholder="学科编号"></el-input>
      </el-form-item>
      <el-form-item label="学科名称">
        <el-input class="normal" v-model="formInline.user" placeholder="学科名称"></el-input>
      </el-form-item>
      <el-form-item label="创建者">
        <el-input class="short" v-model="formInline.user" placeholder="创建者"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select class="normal" v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
        <el-button @click="onSubmit">清除</el-button>
        <el-button type="primary" @click="onSubmit">新增学科</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  name: "subject",
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      }
    };
  }
};
</script>

<style lang="less">
.box-card {
  width: 1191px;
  height: 103px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
  border-radius: 4px;
  .short {
    width: 100px;
  }
  .normal {
    width: 150px;
  }
}
</style>