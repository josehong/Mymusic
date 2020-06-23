<template>
	<div class="new_mv">
		<div class="new_mv_box" v-for="(recept,index) in receptacle" :key ='index'>
			<img :src="recept.cover + '?param=300y150'"/>
			<p><span class="nub">{{index+1}}</span>{{recept.name}}</p>
			<span class="name">{{recept.artistName}}</span>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				receptacle:[]
			}
		},
		mounted(){
			var url = this.HOST + '/top/mv?limit=1000';
			this.$axios.get(url)
			.then(res =>{
				this.receptacle = res.data.data;
//				console.log(res.data.data);
			})
		}
	}
</script>

<style>
	.new_mv .img{
		width: 300px;
		height: 150px;
	}
	.new_mv{
		display: flex;
		flex-wrap: wrap;
	}
	.new_mv_box{
		width: 300px;
		height: 200px;
		margin: 0 auto;
	}
	.new_mv_box p{
		width: 295px;
		height: 22px;
		overflow: hidden;
		font-size: 14px;
		margin-left: 5px;
		margin-top: 5px;
	}
	.new_mv_box .nub{
		margin-right: 10px;
		font-size: 16px;
		color: red;
		font-weight: bold;
	}
	.new_mv_box .name{
		font-size: 10px;
		position: relative;
		bottom: 10px;
		left: 30px;
		color: #555;
	}
</style>