<template>
  <div id="app">
    <el-container class="my-container">
      <el-header class="my-header">
        <div class="lefts">
          <i class="el-icon-s-unfold"></i>
          <img src="../../assets/imgs/矢量智能对象 拷贝 10.png" alt />
          <span>黑马面面</span>
        </div>
        <div class="rights">
          <img :src="userIcon" alt />
          <p>{{username}}</p>
          <button>退出</button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import  { info } from "@/api/index"
export default {
  name: "index",
  data() {
    return {
        // 用户名
      username:"",
      // 用户头像
      userIcon:""
    };
  },
  created() {
    info().then(res=>{
      window.console.log(res);
      //用户名
      this.username=res.data.data.username;
      // 用户头像
      this.userIcon =  process.env.VUE_APP_URL+"/"+res.data.data.avatar
    })
  },
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
        width: 63px;
        height: 15px;
        margin-left: 8px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(99, 99, 99, 1);
      }
      button {
        width: 57px;
        height: 28px;
        background: rgba(64, 158, 255, 1);
        border: 1px solid rgba(54, 156, 255, 1);
        border-radius: 4px;
      }
    }
  }
}
</style>