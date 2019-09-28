import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入 Account 组件
//import account from './app/main/account.vue'
//import goodslist from './app/main/goodslist.vue'

// 导入Account的两个子组件
//import login from './app/sub/login.vue'
//import register from './app/sub/register.vue'
//import header from './app/main/header.vue'
//import left_menu from './app/main/left_menu.vue'
//import main_box from './app/main/main_box.vue'


import car from './app/main/car.vue'
import goodslist from './app/main/goodslist.vue'
import account from './app/main/account.vue'
import login from './app/sub/login.vue'
import register from './app/sub/register.vue'

// 3. 创建路由对象
var router = new VueRouter({
    routes: [
        {path: '/', redirect:'/car'},
        {path: '/car', component: car},
        {
            path: '/account',
            component: account,
            children:[
                {path: 'login', component: login},
                {path: 'register', component: register},
            ]
        },
        {path: '/goodslist', component: goodslist}

        /*{
            path:'/',
            components: {
                default:header,
                left_menu:left_menu,
                main_box:main_box
            }
        }*/
        // account  goodslist
        /*{
            path: '/account',
            component: account,
            children: [
                { path: 'login', component: login },
                { path: 'register', component: register }
            ]
        },
        {
            path: '/goodslist',
            component: goodslist
        }*/
    ]
})

// 把路由对象暴露出去
export default router