<template>
	<div>
		<h1>这个是{{msg}}组件</h1>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				msg: 'login111'
			}
		}

	}
</script>

<style scoped>
	h1 {
		color:red
	}
</style>