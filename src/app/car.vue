<template>
    <div>
        <div class="card card-default mb-4 mt-4">
            <div class="card-body">
                <h3 class="card-title">card heading without title</h3>
                <div class="form-inline">
                    <div class="form-group p-2">
                        <label for="id">id</label>：
                        <input type="text" class="form-control" id="id" placeholder="id" v-model="id">
                    </div>
                    <div class="form-group p-2">
                        <label for="name">name</label>：
                        <input type="text" class="form-control" id="name" placeholder="name" v-model="name">
                    </div>
                    <div class="form-group p-2">
                        <label for="price">price</label>：
                        <input type="text" class="form-control" id="price" placeholder="price" v-model="price">
                    </div>
                    <button type="submit" class="btn btn-primary" @click="add()">添加</button>
                    <div class="form-group p-2">
                        <label for="keywords">keywords</label>：
                        <input type="text" class="form-control" id="keywords" placeholder="keywords" v-model="keywords">
                    </div>
                </div>
                <div class="form-inline">
                    <div class="form-group p-2">
                        <span :class="activeClass" @click="addFromApi()">{{activeText}}</span>
                    </div>
                    <div class="form-group p-2">
                        <input type="text" class="form-control" id="post_id" placeholder="post_id" v-model="post_id">

                        <span :class="activeClass" @click="addFromApiId(post_id)">{{activeText}}</span>
                    </div>
                </div>
            </div>
        </div>
        <table class="table table-hover table-bordered">
            <thead class="thead-dark">
                <tr class="text-center">
                    <th>名称</th>
                    <th>价格</th>
                    <th>日期</th>
                    <th>操作</th>
                </tr>
            </thead>
            <!--在实现列表过度的时候，如果需要过渡的元素是用transitionGroup 而不是 transition-->
            <!--给transition-group添加apper属性，实现入场时侯的效果-->
            <!--通过给transition-group标签tag属性指定将来transition-group渲染成什么元素-->
            <transition-group appear tag="tbody">
                <tr v-for="(car, index) in search(keywords)" :key="car.id">
                    <td>{{car.name}}</td>
                    <td>{{car.price}}</td>
                    <td class="text-center">{{car.date | dateFormat}}</td>
                    <td class="text-center">
                        <a href="#" class="btn btn-danger" @click.prevent="del(car.id)">删除</a>
                    </td>
                </tr>
            </transition-group>
        </table>
    </div>
</template>
<script>
import axios from 'axios'



export default {
    data() {
        return {
            id: '',
            name: '',
            price: '',
            keywords: '',
            post_id: '',

            activeClass: 'btn btn-primary',
            activeText: 'wanna more information',
            cars: [{
                    "id": 1,
                    "name": 'aodi',
                    "price": '30.00',
                    "date": new Date()
                },
                {
                    "id": 2,
                    "name": 'hal5',
                    "price": '50.00',
                    "date": new Date()
                },
                {
                    "id": 3,
                    "name": '玛莎拉蒂',
                    "price": '30.00',
                    "date": new Date()
                },
            ]
        }
    },
    methods: {
        add() {
            if (!this.id || !this.name || !this.price) {
                return false;
            }
            let data = {
                "id": this.id,
                "name": this.name,
                "price": this.price,
                'date': new Date()
            };

            this.cars.push(data);
            this.id = this.name = this.price = '';
        },
        addFromApi() {
            //https://blog.csdn.net/qq_34305040/article/details/80146009
            axios.interceptors.request.use((config) => {
                this.activeClass = 'btn btn-secondary'
                this.activeText = 'Waiting'
                return config;
            });
            axios.get('/api/test/get_cars')
                .then((response) => {
                    /*
                    这里有个坑，用匿名函数会改变this的指向，本意是调用vue的对象，但是实际上指向的不是
                    在JS中，箭头函数并不是简单的function(){}匿名函数的简写语法糖，实际上，箭头函数和匿名函数有个明显的区别：箭头函数内部的this是词法作用域，在编写函数时就已经确定了，由上下文确定。而匿名函数的this指向运行时实际调用该方法的对象，无法在编写函数时确定。
                    不可以当做构造函数，也就是说，不可以使用 new 命令，否则会抛出错误。
                    this、arguments、caller等对象在函数体内都不存在。
                    不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。
                    箭头函数除了传入的参数之外，其它的对象都没有！在箭头函数引用了this、arguments或者参数之外的变量，那它们一定不是箭头函数本身包含的，而是从父级作用域继承的。*/
                    this.cars.push(response.data);
                }).then((response) => {
                    // always executed
                    this.activeClass = 'btn btn-primary'
                    this.activeText = 'wanna more information'
                });
        },
        addFromApiId(id) {
            axios.interceptors.request.use((config) => {
                this.activeClass = 'btn btn-secondary'
                this.activeText = 'Waiting'
                return config;
            });
            axios.post('/api/test/get_car', {id: id})
                .then(response => {
                    console.log(response)
                    this.cars.push(response.data);
                });
        },
        del(id) {
            this.cars.some((current, index) => {
                if (current.id == id) {
                    this.cars.splice(index, 1);
                    return true;
                }
            });
        },
        search(keywords) {
            let new_car = [];
            this.cars.map((item) => {
                if (item.name.indexOf(keywords) != -1) {
                    new_car.push(item);
                }
            });
            return new_car;

            /*this.cars.some((current, index) => {
                current.name.includes(this.keywords) {
                    return current;
                }
            })*/
        }
    },
    filters: {
        dateFormat(input, pattern = '') {
            var dt = new Date(input);
            // 获取年月日
            var y = dt.getFullYear();
            var m = (dt.getMonth() + 1).toString().padStart(2, '0');
            var d = dt.getDate().toString().padStart(2, '0');

            // 如果 传递进来的字符串类型，转为小写之后，等于 yyyy-mm-dd，那么就返回 年-月-日
            // 否则，就返回  年-月-日 时：分：秒
            if (pattern.toLowerCase() === 'yyyy-mm-dd') {
                return `${y}-${m}-${d}`;
            } else {
                // 获取时分秒
                var hh = dt.getHours().toString().padStart(2, '0');
                var mm = dt.getMinutes().toString().padStart(2, '0');
                var ss = dt.getSeconds().toString().padStart(2, '0');
                return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
            }
        }
    }
}
</script>
<style>
.v-enter {
    opacity: 0;
    transform: translateY(90px)
}

.v-leave-to {
    opacity: 0;
    transform: translateX(960px)
}

.v-leave-active,
.v-enter-active {
    transition: all 0.6s ease;

}

/* tr:hover{
    background-color: blue;
    transition: 0.5s
} */

/*下面的.v-move和.v-leave-active配合使用，能够实现列表后续的元素渐渐的漂上来的效果*/
.v-move {
    transition: all 0.6s ease;
}

.v-leave-active {
    position: absolute
}
</style>