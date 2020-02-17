//抽取暴露 验证手机的逻辑
export const checkPhone =(rule,value,callback)=>{
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (reg.test(value) == true) {
        callback()
      }else{
        callback(new Error('手机号格式不对哦，请重新输入'));
      }
}
//抽取暴露 验证邮箱的逻辑
export const checkEmail =(rule,value,callback)=>{
    const reg =/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (reg.test(value) == true) {
        callback()
      }else{
        callback(new Error('邮箱格式不对哦，请重新输入'));
      }
}