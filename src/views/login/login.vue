<template>
  <div class="login-container">
    <div class="left-box">
      <div class="ding">
        <img src="../../assets/imgs/矢量智能对象 拷贝 9.png" alt />
        <p>黑马面面</p>
        <i></i>
        <span>用户登录</span>
      </div>
      <div class="zhong">
        <el-input
          class="MobileLei"
          prefix-icon="el-icon-user"
          placeholder="请输入手机号"
          v-model="Mobile"
        ></el-input>
        <el-input
          class="cipher"
          prefix-icon="el-icon-lock"
          placeholder="请输入密码"
          v-model="cipher"
          show-password
        ></el-input>
        <el-input class="code" placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="code"></el-input>
        <el-row>
          <el-col class="item" :span="7"></el-col>
        </el-row>
      </div>
      <div class="xieyi">
        <el-checkbox class="hezi" v-model="checked"></el-checkbox>
        <p>我已阅读并同意</p>
        <el-link type="primary" class="da">用户协议</el-link>
        <p>和</p>
        <el-link type="primary" class="da">隐私条款</el-link>
      </div>
      <div class="buttons">
        <el-button class="button_an" type="primary">登录</el-button>
        <el-button class="button_an" type="primary">注册</el-button>
      </div>
    </div>
    <img src="../../assets/imgs/login_banner_ele.png" alt />
  </div>
</template>
<script>
export default {
  nama: "login",
  //名字
  data() {
    return {
      Mobile: "",
      cipher: "",
      code: "",
      checked: ""
    };
  }
};
</script>
<style lang="less">
.login-container {
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  // 开启弹性布局
  display: flex;
  //上下居中
  align-items: center;
  //左右均分
  justify-content: space-around;
  .left-box {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    .ding {
      width: 100%;
      height: 50px;
      img {
        float: left;
        width: 30px;
        margin-left: 54px;
        margin-top: 40px;
      }
      p {
        float: left;
        margin: 30px 15px 0 20px;
        font-size: 30px;
      }
      i {
        float: left;
        width: 1px;
        height: 24px;
        margin-top: 33px;
        background: rgba(200, 200, 200, 1);
      }
      span {
        float: left;
        margin: 30px 15px 0 15px;
        font-size: 30px;
      }
    }
    .zhong {
      // margin-top: 26px;
      margin-left: 50px;
      .MobileLei,
      .cipher {
        width: 360px;
        height: 40px;
        margin-top: 45px;
      }
      .code {
        display: inline-block;
        width: 240px;
        height: 40px;
        margin-top: 45px;
      }
      .item {
        float: right;
        margin-right: 70px;
        margin-top: -40px;
        height: 40px;
        background-color: #f00;
      }
    }
    .xieyi {
      margin-left: 50px;
      margin-top: 20px;
      .hezi {
        width: 18px;
      }
      p {
        display: inline-block;
        color: rgba(153, 153, 153, 1);
      }
      .da {
        font-size: 16px;
        margin-top: -5px;
      }
    }
    .buttons{
      .button_an{
        margin:20px 0 0 50px; 
        width: 360px;
      }
    }
  }
}
</style>