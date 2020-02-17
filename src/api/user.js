//导入公共请求
import request from "../utils/request.js"

// 用户删除
export function userRemove(data) {
    return request({
        url: '/user/remove',
        method: 'post',
        data
    });
}
// 用户编辑
export function userEdit(data) {
    return request({
        url: '/user/edit',
        method: 'post',
        data
    });
}
// 用户状态设置
export function userStatus(data) {
    return request({
        url: '/user/status',
        method: 'post',
        data
    });
}
// 用户列表列表
// 记住参数不同
export function userList(params) {
    return request({
        url: '/user/list',
        method: 'get',
        // get请求的参数如何设置
        params
    });
}
// 用户添加
export function userAdd(data) {
    return request({
        url: '/user/add',
        method: 'post',
        data
    });
}
