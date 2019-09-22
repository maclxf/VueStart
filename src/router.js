import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入 Account 组件
import account from './app/main/account.vue'
import goodslist from './app/main/goodslist.vue'

// 导入Account的两个子组件
import login from './app/sub/login.vue'
import register from './app/sub/register.vue'

// 3. 创建路由对象
var router = new VueRouter({
    routes: [
        // account  goodslist
        {
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
        }
    ]
})

// 把路由对象暴露出去
export default router