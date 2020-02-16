import Vue from 'vue'


// 导入 moment 
import moment from "moment"

Vue.filter('formatTime', value => {
    //YYYY年
    //MM月
    //DD日
    return moment(value).format('YYYY年MM月DD日')
})
