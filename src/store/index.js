//导入Vue
import Vue from 'vue'
//导入Vuex
import Vuex from 'vuex'


//use下
Vue.use(Vuex)


// 创建仓库对象

const store = new Vuex.Store({
    state: {
        //用户头像
        userIcon: "",
        //用户名字
        usernme: ""
    },
    mutations: {
        //修改头像
        changeIcon(state, newIocn) {
            state.userIcon = newIocn
        },
        //修改名字
        changeName(state, newName) {
            // window.console.log(newName)
            state.username = newName
        }
    }
})

export default store