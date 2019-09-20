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
		            <button type="submit" class="btn btn-info" @click="add()">添加</button>
		        </div>
		        <div class="form-inline">
		            <div class="form-group p-2">
		                <label for="keywords">关键字</label>：
		                <input type="text" class="form-control" id="keywords" placeholder="keywords" v-model="keywords" @change="search()">
		            </div>

		        </div>
		    </div>
		</div>
		<table  class="table table-hover table-bordered">
			<thead class="thead-dark">
				<tr class="text-center">
				  <th>名称</th>
				  <th>价格</th>
				  <th>日期</th>
				  <th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(car, index) in cars" :key="car.id">
					<td>{{car.name}}</td>
					<td>{{car.price}}</td>
					<td class="text-center">{{car.date}}</td>
					<td class="text-center">
						<a href="#" class="btn btn-danger" @click.prevent="del(car.id)">删除</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				name: '',
				price: '',
				keywords:'',
				cars: [
					{
						"id": 1,
						"name":'aodi',
						"price":'30.00',
						"date": new Date()
					},
					{
						"id": 2,
						"name":'hal5',
						"price":'50.00',
						"date": new Date()
					},
					{
						"id": 3,
						"name":'玛莎拉蒂',
						"price":'30.00',
						"date": new Date()
					},
				]
			}
		},
		methods: {
			add() {
				let data = {
					"id": this.id,
					"name": this.name,
					"price": this.price,
					'date': new Date()
				};

				this.cars.push(data);
				this.id = this.name = this.price = '';
			},
			del(id) {
				this.cars.some((current, index) => {
					if (current.id == id) {
						this.cars.splice(index, 1);
						return true;
					}
				});
			},
			search() {
				/*this.cars.some((current, index) => {
					current.name.includes(this.keywords) {
						return current;
					}
				})*/
			}
		}

	}

</script>

<style>

</style>