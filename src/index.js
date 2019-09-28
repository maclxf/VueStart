import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.css'

import index from './app/index.vue'
import router from './router.js'

let vm = new Vue({
	el : "#app",
	render: c => c(index),
	router
});

/*
import car from './app/car.vue'
let vmcar = new Vue({
	el : "#car",
	render: c => c(car),
});*/