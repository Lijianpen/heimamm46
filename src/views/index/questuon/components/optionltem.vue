<template>
  <div class="option-container">
    <!-- 单选框 -->
    <el-radio v-if="isRadio" :label="label"></el-radio>
    <!-- 多选框 -->
    <el-checkbox v-else :label="label"></el-checkbox>
    <!-- 输入框 -->
    <el-input :value="text" @input="input" placeholder></el-input>
    <!-- 上传组件 -->
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<script>
export default {
  //定义的属性 让外部传递
  props: {
    label: String,
    text: String,
    image: String,
    isRadio: {
      tyep: Boolean,
      default: true
    }
  },
  data() {
    return {
      //图片预览地址
      imageUrl: "",
      //上传的地址
      uploadURL: process.env.VUE_APP_URL + "/question/upload"
    };
  },

  methods: {
    input(v) {
      this.$emit("update:text", v);
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      //通知父组件
      this.$emit("update:image", res.dara.url);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传只能是图片格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style lang="less">
.option-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
  // 输入框
  .el-input {
    width: 450px;
    margin-right: 20px;
  }
  // 上传组件的样式
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>