<template>
  <el-dialog
    class="entreprise-edit"
    width="600px"
    center
    title="编辑企业"
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="form" ref="enterpriseEdit" :rules="rules">
      <el-form-item prop="eid" label="企业编号" :label-width="formLabelWidth">
        <el-input v-model="form.eid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="企业名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="short_name" label="企业简称" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="intro" label="企业简介" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="remark" label="企业备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('enterpriseEdit')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { enterpriseEdit } from "@/api/enterpise.js";
export default {
  name: "enterpriseEdit",
  data() {
    return {
      // 是否显示对话框
      dialogFormVisible: false,
      // 表单绑定的数据
      form: {
        // 学科编号
        eid: "",
        // 学科名称
        name: "",
        // 简称
        short_name: "",
        // 简介
        intro: "",
        // 备注
        remark: ""
      },
      rules: {
        eid: [{ required: true, message: "企业编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "企业名称不能为空", trigger: "blur" }]
      },
      // 文字的宽度
      formLabelWidth: "120px"
    };
  },
  methods: {
    submitForm(formName) {
      // 获取所有的数据
      this.$refs[formName].validate(valid => {
        // 传递所有的值
        if (valid) {
          enterpriseEdit(this.form).then(res => {
            if (res.code === 200) {
              // 关闭编辑框
              this.dialogFormVisible = false;
              // 清空对话框
              this.$refs[formName].resetFields();
              // 重新获取数据
              this.$parent.getDate();
              //提示用户
              this.$message.success("编辑成功");
            } else {
              // 失败
              this.$message.error("编辑失败");
              return false;
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="less">
.subject-edit {
  .el-dialog__header {
    background: linear-gradient(to right, #00c6f9, #1495fb);
  }
  .el-dialog__title {
    color: white;
  }
  .el-dialog__close {
    color: white;
  }
}
</style>