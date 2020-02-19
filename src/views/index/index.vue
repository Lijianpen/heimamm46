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
          <img :src="$store.state.userIcon" alt />
          <p>{{$store.state.username}} ,你好!</p>
          <el-button type="primary" @click="logout">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="auto" class="my-aside">
          <!-- 导航菜单 -->
          <el-menu
            router
            :collapse="isCollapse"
            :default-active="$route.path"
            class="el-menu-vertical-demo"
          >
            <template v-for="(item, index) in navRoutes">
              <el-menu-item
                :key="index"
                :index="item.meta.fullPath"
                v-if="item.meta.rules.includes($store.state.role)"
              >
                <!-- 图标 -->
                <i :class="item.meta.icon"></i>
                <span slot="title">{{ item.meta.title }}</span>
              </el-menu-item>
            </template>
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
import { removeToken } from "@/utils//token";
import navRoutes from "../../route/childrenRoutes.js";
export default {
  name: "index",
  data() {
    return {
      // // 用户名
      // username: "",
      // // 用户头像
      // userIcon: "",
      //是否折叠
      isCollapse: false,
      navRoutes: navRoutes
    };
  },
  methods: {
    logout() {
      this.$confirm("你确定要离开我们网站", "友情提示", {
        confirmButtonText: "狠心离开",
        cancelButtonText: "继续看看",
        type: "error"
      })
        .then(() => {
          // 点击确定
          logout().then(res => {
            // window.console.log(res)
            if (res.data.code === 200) {
              // 移除token
              removeToken();
              //移除头像和名字
              this.$store.commit("changeIcon", "");
              this.$store.commit("changeName", "");
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
  created() {}
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
    width: 200px;
    min-height: 400px;
  }
}
</style>