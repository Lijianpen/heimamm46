// 导入 axios
import axios from 'axios';

// const loginRequest = axios.create({
//     //基地址
//     baseURL:process.env.VUE_APP_URL,
//     // 是否跨域
//     // 是否跨域携带cookie 默认是false
//     withCredentials:true //默认是 false
// })

// // 把注册相关的接口调用 抽取为函数 并暴露 带名字的暴露
// export function login(data) {
//   return loginRequest({
//     url:'/login',
//     method:'post',
//     data
//   });
// }
const loginRequest = axios.create({
  // 基地址
  baseURL:process.env.VUE_APP_URL,
  // 是否跨域
  withCredentials:true
})

// 用户的登录 接口
export function login(data) {
return loginRequest({
    url:"/login",
    method:"post",
    data
})
}
