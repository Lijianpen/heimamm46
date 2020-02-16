//导入公共请求
import request from "../utils/request.js"

// 企业删除
export function enterpriseRemove(data) {
    return request({
        url: '/enterprise/remove',
        method: 'post',
        data
    });
}
// 企业编辑
export function enterpriseEdit(data) {
    return request({
        url: '/enterprise/edit',
        method: 'post',
        data
    });
}
// 企业状态设置
export function enterpriseStatus(data) {
    return request({
        url: '/enterprise/status',
        method: 'post',
        data
    });
}
// 企业列表
// 记住参数不同
export function enterpriseList(params) {
    return request({
        url: '/enterprise/list',
        method: 'get',
        // get请求的参数如何设置
        params
    });
}
// 学科添加
export function enterpriseAdd(data) {
    return request({
        url: '/enterprise/add',
        method: 'post',
        data
    });
}
