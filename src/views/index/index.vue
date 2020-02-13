<template>
  <div id="app">
    <el-container class="my-container">
      <el-header class="my-header">
        <div class="lefts">
          <!-- 左边 -->
          <i @click="isCollapse= !isCollapse" class="el-icon-s-unfold"></i>
          <img src="../../assets/imgs/矢量智能对象 拷贝 10.png" alt />
          <span>黑马面面</span>
        </div>
        <div class="rights">
          <!-- 右边 -->
          <img :src="userIcon" alt />
          <p>{{username}} ,你好!</p>
          <el-button type="primary" @click="logout">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="aotu">
          <el-menu
            router
            :collapse="isCollapse"
            default-active="$route.path"
            class="el-menu-vertical-demo"
          >
            <el-menu-item index="/index/chart">
              <i class="el-icon-pie-chart"></i>
              <span slot="title">数据概览</span>
            </el-menu-item>
            <el-menu-item index="/index/user">
              <i class="el-icon-user"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
            <el-menu-item index="/index/questuon">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">题库列表</span>
            </el-menu-item>
            <el-menu-item index="/index/enterprise">
              <i class="el-icon-office-building"></i>
              <span slot="title">企业列表</span>
            </el-menu-item>
            <el-menu-item index="/index/subject">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">学科列表</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <!-- 路口出处 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { logout } from "@/api/index";
import {  removeToken } from "@/utils//token";
export default {
  name: "index",
  data() {
    return {
      // 用户名
      username: "",
      // 用户头像
      userIcon: "",
      //是否折叠
      isCollapse: false
    };
  },
  methods: {
    logout() {
      this.$confirm("你确定要离开我们网站", "友情提示", {
        confirmButtonText: "狠心离开",
        cancelButtonText: "继续看看",
        type: "error"
        // type: "success"
      })
        .then(() => {
          // 点击确定
          logout().then(res => {
            // window.console.log(res)
            if (res.data.code === 200) {
              // 移除token
              removeToken();
              // 去登录页
              this.$router.push("/login");
            }
          });
        })
        .catch(() => {
          // 点击取消
        });
    }
  },
  // created() {
  //   info().then(res => {
  //     if (res.data.code === 206) {
  //       this.$message.warning("登录状态有误,请重新登录");
  //       removeToken();
  //       this.$router.push("/login");
  //     } else if (res.data.code === 200) {
  //       // window.console.log(res);
  //       //用户名
  //       this.username = res.data.data.username;
  //       // 用户头像
  //       this.userIcon = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
  //     }
  //   });
  // },
  // //申明周期钩子
  // //判断有没有token
  // beforeCreate() {
  //   // 如果没有值
  //   if (getToken() == unescape) {
  //     //提示用户
  //     this.$message.warning("请先登入");
  //     //返回首页
  //     this.$router.push("/");
  //   }
  // }
};
</script>
<style lang="less">
#app {
  height: 100%;
  .my-container {
    height: 100%;
  }
  .my-header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .lefts {
      display: flex;
      align-items: center;
      i {
        font-size: 24px;
        margin-right: 22px;
      }
      img {
        width: 24px;
      }
      span {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
        margin-left: 16px;
      }
    }
    .rights {
      display: flex;
      align-items: center;
      float: right;
      img {
        width: 43px;
        height: 43px;
      }
      p {
        width: 83px;
        height: 15px;
        margin-left: 10px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(99, 99, 99, 1);
      }
    }
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 150px;
    min-height: 400px;
  }
}
</style>