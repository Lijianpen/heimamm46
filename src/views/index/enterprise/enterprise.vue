<template>
  <div class="enterprise-container">
    <!-- 顶部的盒子 -->
    <el-card class="top-card">
      <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号" prop="eid">
          <el-input class="short" v-model="formInline.eid" placeholder="企业编号"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input class="normal" v-model="formInline.name" placeholder="企业名称"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="short" v-model="formInline.username" placeholder="创建者"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select class="normal" v-model="formInline.status" placeholder="状态">
            <el-option label="所有" value></el-option>
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="enterpriseSubject" type="primary">搜索</el-button>
          <el-button @click="clearSeach">清除</el-button>
          <el-button
            @click="$refs.enterpriseAdd.dialogFormVisible =true"
            icon="el-icon-plus"
            type="primary"
          >新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 底部的盒子 -->
    <el-card class="bottom-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">
            <!-- 使用全局过滤器 -->
            {{ scope.row.create_time | formatTime }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="niubi">
            <el-button type="text" size="mini" @click="handleEdit(niubi.$index, niubi.row)">编辑</el-button>
            <!-- 启用，禁用 -->
            <el-button
              size="mini"
              type="text"
              @click="changeStatus(niubi.$index, niubi.row)"
            >{{ niubi.row.status === 1 ? '禁用' : '启用' }}</el-button>
            <el-button size="mini" type="text" @click="handleDelete(niubi.$index, niubi.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        class="my-pagination"
        background
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="index"
        :page-sizes="[2, 4, 5, 10]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <enterpriseAdd ref="enterpriseAdd"></enterpriseAdd>
    <enterpriseEdit ref="enterpriseEdit"></enterpriseEdit>
  </div>
</template>

<script>
//导入接口
import {
  enterpriseList,
  enterpriseStatus,
  enterpriseRemove
} from "@/api/enterpise.js";
// 导入新增企业页面
import enterpriseAdd from "./components/enterpriseAdd.vue";
import enterpriseEdit from "./components/enterpriseEdit.vue";
export default {
  name: "enterprise",
  // 注册组件
  components: {
    enterpriseAdd,
    enterpriseEdit
  },
  data() {
    return {
      // 是否显示新增框
      dialogFormVisible: false,
      // 顶部表单的数据
      formInline: {
        // 企业名
        name: "",
        // 企业编号
        eid: "",
        // 状态
        status: "",
        // 创建者名
        username: ""
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
      size: 2,
      // 总条数
      total: 20
    };
  },
  created() {
    this.getDate();
  },
  methods: {
    // 获取数据
    getDate() {
      enterpriseList({
        //页码
        page: this.index,
        // 页容量
        limit: this.size,
        ...this.formInline
      }).then(res => {
        // window.console.log(res);
        //表格数据
        this.tableData = res.data.items;
        //页数
        this.total = res.data.pagination.total;
      });
    },
    // 清除
    clearSeach() {
      //饿了吗ui 自带的
      this.$refs.formInline.resetFields();

      // 返回第一页
      this.index = 1;
      // 重新获取数据
      this.getDate();
    },
    //企业搜索
    enterpriseSubject() {
      this.index = 1;
      this.getDate();
    },
    // 编辑
    handleEdit(index, row) {
      window.console.log(index, row);
      this.enterpriseEdit.dialogFormVisible = true;
      if (row.id != this.$refs.dialogFormVisible.form.id) {
        this.$refs.dialogFormVisible.form = JSON.parse(JSON.stringify(row));
      }else{
        //不执行
      }
    },
    // 删除
    handleDelete(index, row) {
      // window.console.log(index, row);
      this.$confirm("此操作将永久删除该学科, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 确定
          enterpriseRemove({
            id: row.id
          }).then(res => {
            // 成功提示用户
            if (res.code === 200) {
              if (this.tableData.length === 1) {
                this.index--;
                if (this.index <= 0) {
                  index = 1;
                }
              }
              this.$message.success("删除成功");
            }
            // 重新获取数据
            this.getDate();
          });
        })
        .catch(() => {});
    },
    // 不允许
    changeStatus(index, row) {
      // window.console.log(index, row);
      enterpriseStatus({
        id: row.id
      }).then(res => {
        window.console.log(res);
        this.$message.success("切换成功");
        // 重新加载数据
        this.getDate();
      });
    },
    // 页容量改变
    sizeChange(val) {
      // window.console.log(`每页 ${val} 条`);
      // 发生改变回到第一页
      this.index = 1;
      // 设置新的页容量
      this.size = val;
      // 重新获取数据
      this.getDate();
    },
    // 页码改变
    currentChange(val) {
      // window.console.log(`当前页: ${val}`);
      this.index = val;
      // 重新获取数据
      this.getDate();
    }
  }
};
</script>

<style lang="less">
// 最外层容器
.enterprise-container {
  // 顶部的卡片
  .top-card {
    // 短的输入框
    .short {
      width: 100px;
    }
    // 长一些的输入框
    .normal {
      width: 150px;
    }
  }
  // 底部的卡片
  .bottom-card {
    margin-top: 19px;
    .my-pagination {
      margin-top: 30px;
      text-align: center;
    }
  }
}
</style>
