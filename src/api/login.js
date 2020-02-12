// 导入 axios
import axios from 'axios';

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
