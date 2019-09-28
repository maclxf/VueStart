<template>
	<div>
		<div class="header">
			<h1>这个是header组件</h1>
		</div>
		<div class="under">
			<div class="left_menu">
				<strong>目录 </strong>
				<ul>
					<li><router-link to="/">首页</router-link></li>
					<li><router-link to="/car">车子</router-link></li>
					<li><router-link to="/account">account</router-link></li>
					<li><router-link to="/goodslist">goodslist</router-link></li>
				</ul>
			</div>
			<div class="main_box">
				<strong>这个是main box组件</strong>
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>


</script>

<style>
.header {
	border:1px solid lightpink;
	height:100px
}
h1 {
	margin:0;
	padding:0
}
.under {
	display:flex;
	/* height:600px */
}
.under .left_menu {
	border:1px solid lightgreen;
	flex:0.2
}
.under .main_box {
	border:1px solid orange;
	padding: 20px;
	flex:0.8
}
</style>