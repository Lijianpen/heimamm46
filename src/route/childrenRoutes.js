import chart from "../views/index/chart/chart.vue"
import enterprise from "../views/index/enterprise/enterprise.vue"
import questuon from "../views/index/questuon/questuon.vue"
import user from "../views/index/user/user.vue"
import subject from "../views/index/subject/subject.vue"


export default [
    {
        //不用加/ 
        //会自动解析为/chart
        path: "chart",
        component: chart,
        meta: {
            title: "数据概览",
            rules: ['管理员', '老师', '学生'],
            icon: "el-icon-pie-chart",
            // 完全地址
            fullPath: '/index/chart'
        }
    },
    {
        path: "enterprise",
        component: enterprise,
        meta: {
            title: "企业列表",
            rules: ['管理员'],
            icon: "el-icon-office-building",
            // 完全地址
            fullPath: '/index/enterprise'

        }
    },
    {
        path: "questuon",
        component: questuon,
        meta: {
            title: "题库列表",
            rules: ['管理员', '老师'],
            icon: "el-icon-edit-outline",
            // 完全地址
            fullPath: '/index/questuon'
        }
    },
    {
        path: "subject",
        component: subject,
        meta: {
            title: "学科列表",
            rules: ['管理员', '老师', '学生'],
            icon: "el-icon-notebook-2",
            // 完全地址
            fullPath: '/index/subject'
        }
    },
    {
        path: "user",
        component: user,
        meta: {
            title: "用户列表",
            rules: ['管理员'],
            icon: "el-icon-user",
            // 完全地址
            fullPath: '/index/user'
        }
    }
]