<template>
  <el-dialog
    class="question-add"
    :destroy-on-close="isDestroy"
    fullscreen
    title="新增题库"
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="form" ref="addForm" :rules="rules">
      <el-form-item label="学科" prop="subject" :label-width="formLabelWidth">
        <subjectSel :siQuery="false" v-model="form.subject" />
      </el-form-item>
      <el-form-item label="阶段" prop="step" :label-width="formLabelWidth">
        <el-select v-model="form.step" placeholder="请选择阶段">
          <el-option label="初级" :value="1"></el-option>
          <el-option label="中级" :value="2"></el-option>
          <el-option label="高级" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" prop="enterprise" :label-width="formLabelWidth">
        <enterpriseSel :siQuery="false" v-model="form.enterprise" />
      </el-form-item>
      <el-form-item label="城市" prop="city" :label-width="formLabelWidth">
        <chinaArea v-model="form.city" />
      </el-form-item>
      <el-form-item label="题型" prop="type" :label-width="formLabelWidth">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="2">多选</el-radio>
          <el-radio :label="3">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度" prop="difficulty" :label-width="formLabelWidth">
        <el-radio-group v-model="form.difficulty">
          <el-radio :label="1">简单</el-radio>
          <el-radio :label="2">一般</el-radio>
          <el-radio :label="3">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 富文本编辑器1 -->
      <el-form-item label="试题标题" prop="title" :label-width="formLabelWidth">
        <myEditor v-model="form.title" />
      </el-form-item>
      <!-- 选项区域 单选 -->
      <el-form-item
        v-if="form.type==1"
        prop="single_select_answer"
        label="单选"
        :label-width="formLabelWidth"
      >
        <el-radio-group v-model="form.single_select_answer">
          <optionltem
            v-for="(item,index) in form.select_options"
            :key="index"
            :label="item.label"
            :text.sync="item.text"
            :image.sync="item.image"
          />
        </el-radio-group>
      </el-form-item>
      <!-- 选项区域 多选 -->
      <el-form-item
        v-else-if="form.type==2"
        prop="multiple_select_answer"
        label="多选"
        :label-width="formLabelWidth"
      >
        <el-checkbox-group v-model="form.multiple_select_answer">
          <optionltem
            v-for="(item,index) in form.select_options"
            :key="index"
            :isRadio="false"
            :label="item.label"
            :text.sync="item.text"
            prop="multiple_select_answer"
          />
          <!-- <el-checkbox label="A"></el-checkbox>
          <el-checkbox label="B"></el-checkbox>
          <el-checkbox label="C"></el-checkbox>
          <el-checkbox label="D"></el-checkbox>-->
        </el-checkbox-group>
      </el-form-item>
      <!-- 选项区域 简答 -->
      <el-form-item v-else label="简答" prop="short_answer" :label-width="formLabelWidth">
        <el-input v-model="form.short_answer" type="textarea" rows="4" placeholder></el-input>
      </el-form-item>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <el-form-item label="解析视频" prop="video" :label-width="formLabelWidth">
        <!-- <uploadVideo v-bind:video="form.video" @update:video="v=>form.video=v"></uploadVideo> -->
        <uploadVideo :video.sync="form.video"></uploadVideo>
      </el-form-item>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 富文本编辑器2 -->
      <el-form-item label="答案解析" prop="answer_analyze" :label-width="formLabelWidth">
        <myEditor v-model="form.answer_analyze" />
      </el-form-item>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 试题备注 -->
      <el-form-item label="试题备注" prop="remark" :label-width="formLabelWidth">
        <el-input v-model="form.remark" type="textarea" rows="2" placeholder></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
// 导入抽取的省区组件
import chinaArea from "./chinaArea.vue";
//导入抽取的富文本编辑器
import myEditor from "./myEditor.vue";
// 导图抽取的选项框
import optionltem from "./optionltem.vue";
// 导入上传视频组件
import uploadVideo from "./uploadeo.vue";
// 导入接口
import { questionAdd } from "@/api/question.js";
export default {
  // 注册组件
  components: {
    chinaArea,
    myEditor,
    optionltem,
    uploadVideo
  },
  data() {
    return {
      dialogFormVisible: false,
      //表单数据
      form: {
        // 阶段
        step: "",
        // 学科和企业
        subject: "",
        enterprise: "",
        // 省市区
        city: [],
        // 题型 和难度
        type: 1,
        difficulty: 1,
        // 富文本编辑器的数据 标题 答案解析(answer_analyze)
        title: "我是一个标题",
        answer_analyze: "默认的答案解析",
        // 答案 单选，多选，简答
        single_select_answer: "",
        multiple_select_answer: [],
        short_answer: "",
        //选项
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
          },
          {
            label: "B",
            text: "猫不理",
            image: "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
          },
          {
            label: "C",
            text: "麻花",
            image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
          },
          {
            label: "D",
            text: "炸酱面",
            image: "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
          }
        ],
        // 解析视频
        video: "",
        //备注
        remark: ""
      }, // 表单的校验
      rules: {
        // 学科 subject
        subject: [
          { required: true, message: "学科不能为空", trigger: "change" }
        ],
        // 阶段 step
        step: [{ required: true, message: "阶段不能为空", trigger: "change" }],
        // 企业 enterprise
        enterprise: [
          { required: true, message: "企业不能为空", trigger: "change" }
        ],
        // 城市 city
        city: [{ required: true, message: "城市不能为空", trigger: "change" }],
        // 题型 type
        type: [{ required: true, message: "题型不能为空", trigger: "change" }],
        // 难度 difficulty
        difficulty: [
          { required: true, message: "难度不能为空", trigger: "change" }
        ],
        // 标题 title
        title: [{ required: true, message: "标题不能为空", trigger: "change" }],
        // 单选 single_select_answer
        single_select_answer: [
          { required: true, message: "单选不能为空", trigger: "change" }
        ],
        // 多选 multiple_select_answer
        multiple_select_answer: [
          { required: true, message: "多选不能为空", trigger: "change" }
        ],
        // 简答 short_answer
        short_answer: [
          { required: true, message: "简答不能为空", trigger: "change" }
        ],
        // 答案解析 answer_analyze
        answer_analyze: [
          { required: true, message: "答案解析不能为空", trigger: "change" }
        ],
        // 试题备注 remark
        remark: [
          { required: true, message: "试题备注不能为空", trigger: "change" }
        ]
      },
      formLabelWidth: "130px",
      // 是否销毁数据
      isDestroy: false
    };
  },
  methods: {
    //数据提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          questionAdd(this.form).then(res => {
            if (res.code === 200) {
              this.$message.success("数据提交成功");
              //重置表单
              this.$refs.addForm.resetFields();
              //清除吧内部的组织全部销毁 重新读取父组件的数据 并渲染
              this.isDestroy = true;
              // 重新获取数据
              this.dialogFormVisible = false;
            }
          });
        } else {
          this.$message.warning("数据提交失败");
          return false;
        }
      });
    },
    cancel() {
      // 不销毁
      this.isDestroy = false;
      // 关闭
      this.dialogFormVisible = false;
    }
  }
};
</script>
<style lang="less">
.question-add {
  .el-form {
    width: 835px;
    margin: 0 auto;
  }
  // 选择框宽度
  .el-select {
    width: 364px;
  }
  // 级联选择器的宽度
  .el-cascader {
    width: 364px;
  }
}
</style>
