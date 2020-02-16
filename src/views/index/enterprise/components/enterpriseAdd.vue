<template>
  <el-dialog
    class="subject-add"
    width="600px"
    center
    title="新增企业"
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="form" ref="subjectAdd" :rules="rules">
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
      <el-button type="primary" @click="submitForm('subjectAdd')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { enterpriseAdd } from "@/api/enterpise.js";
export default {
  name: "subjectAdd",
  data() {
    return {
      // 是否显示对话框
      dialogFormVisible: false,
      // 表单绑定的数据
      form: {
        // 企业编号
        eid: "",
        // 企业名称
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
      // 获取所有的内容
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 成功获取
          // 把from所有的值全部传递过来
          enterpriseAdd(this.form).then(res => {
            window.console.log(res);
            if (res.code === 200) {
              // 关闭新增框
              this.dialogFormVisible = false;
              // 清空新增框
              // resetFields 饿了吗ui自带的
              this.$refs[formName].resetFields();
              // 重新加载数据
              this.$parent.getDate();
              // 提示对方新增成功
              this.$message.success("新增成功");
            } else if (res.code === 201) {
              this.$message.warning(res.massage);
            }
          });
        } else {
          // 失败
          //提示对方
          this.$message.error("数据错误,请检查");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less">
.subject-add {
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