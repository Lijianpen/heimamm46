<template>
  <div class="subject-container">
    <!-- 顶部的盒子 -->
    <el-card class="box-card">
      <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号" prop="rid">
          <el-input class="short" v-model="formInline.rid" placeholder="学科编号"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input class="normal" v-model="formInline.name" placeholder="学科名称"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="short" v-model="formInline.username" placeholder="创建者"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" prop="name">
          <el-select class="normal" v-model="formInline.status" placeholder="活动区域">
            <el-option label="所有" value></el-option>
            <el-option label="禁用" value="1"></el-option>
            <el-option label="启动" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchSubject" type="primary">搜索</el-button>
          <el-button @click="clearSeach">清除</el-button>
          <el-button
            @click="$refs.subjectAdd.dialogFormVisible=true"
            icon="el-icon-plus"
            type="primary"
          >新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 底部的盒子 -->
    <el-card class="bottom-card">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" width="50" label="索引"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">
            {{scope.row.creare_time | formatTime}}
            </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status===1">启用</span>
            <span style="color:red" v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="niubi">
            <el-button type="text" size="mini" @click="handleEdit(niubi.$index, niubi.row)">编辑</el-button>
            <el-button
              type="text"
              size="mini"
              @click="handleNotAllow(niubi.$index, niubi.row)"
            >{{ niubi.row.status===1 ?'禁用' : '启用'}}</el-button>
            <el-button size="mini" type="text" @click="handleDelete(niubi.$index, niubi.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        class="my-pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="index"
        :page-sizes="[2, 4, 5,10]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 出口 -->
    <subjectAdd ref="subjectAdd"></subjectAdd>
    <subjectEdit ref="subjectEdit"></subjectEdit>
  </div>
</template>
<script>
// 导入接口
import { subjectList, subjectStatus, subjectRemove } from "@/api/subject.js";
import subjectAdd from "./components/subjectAdd.vue";
import subjectEdit from "./components/subjectEdit.vue";
export default {
  name: "subject",
  // 注册组件
  components: {
    subjectAdd,
    subjectEdit
  },
  data() {
    return {
      //学科编号
      rid: "",
      //学科名称
      name: "",
      //创建者
      username: "",
      //状态
      status: "",
      //是否显示新增框
      dialogFormVisible: false,
      //顶部表单数据
      formInline: {
        user: "",
        region: ""
      },
      // 底部表格的数据
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      // 分页器的数据
      // 页码
      index: 1,
      // 页容量
      size: 5,
      // 总条数
      total: 20
    };
  },
  created() {
    this.getDate();
  },
  methods: {
    //清除表单
    clearSeach() {
      //resetFields
      this.$refs.formInline.resetFields();
      // this.$refs['formInline'].resetFields();
      // 返回第一页
      this.index = 1;
      // 重新获取数据
      this.getDate();
    },
    //学科搜索
    searchSubject() {
      // 跳到第一页
      this.index = 1;
      // 获取数据
      this.getDate();
    },
    // 调用方法
    getDate() {
      subjectList({
        // 页码
        page: this.index,
        //页容量
        limit: this.size,
        // 合并条件 展开运算符
        ...this.formInline
      }).then(res => {
        // window.console.log(res)
        //表格数据
        this.tableData = res.data.items;
        // 页数
        this.total = res.data.pagination.total;
      });
    },
    // 编辑
    handleEdit(index, row) {
      // window.console.log(index, row);
      // row.name = "王二花";
      // 弹出编辑框
      this.$refs.subjectEdit.dialogFormVisible = true;
      // 获取数据并显示在框里
      // 看id相不相等 不相等就执行清空
      if (row.id != this.$refs.subjectEdit.form.id) {
        this.$refs.subjectEdit.form = JSON.parse(JSON.stringify(row));
      } else {
        //相等的就不执行
      }
    },
    // 删除
    handleDelete(index, row) {
      window.console.log(index, row);
      this.$confirm("此操作将永久删除该学科, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 确定
          subjectRemove({
            id: row.id
          }).then(res => {
            if (res.code === 200) {
              this.$message.success("删除成功");
              if (this.tableData.length == 1) {
                this.index--;
                if (this.index <= 0) {
                  index = 1;
                }
              }
              this.getDate();
            }
          });
        })
        .catch(() => {});
    },
    // 不允许
    handleNotAllow(index, row) {
      window.console.log(index, row);
      subjectStatus({
        id: row.id
      }).then(res => {
        //判断
        if (res.code === 200) {
          // window.console.log(res);
          this.getDate();
          this.$message.success("状态修改成功!");
        }
      });
    },
    // 页容量改变
    sizeChange(val) {
      window.console.log(`每页 ${val} 条`);
      // 返回第一页
      this.index = 1;
      //设置新的页容量
      this.size = val;
      // 重新获取数据
      this.getDate();
    },
    // 页码改变
    currentChange(val) {
      window.console.log(`当前页: ${val}`);
      this.index = val;
      this.getDate();
    }
  }
};
</script>
