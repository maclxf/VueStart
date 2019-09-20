import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import index from './app/index.vue'

import 'bootstrap/dist/css/bootstrap.css'

import car from './app/car.vue'

import router from './router.js'



let vm = new Vue({
	el : "#app",
	render: c => c(index),
	router
});

let vmcar = new Vue({
	el : "#car",
	render: c => c(car),
});