<template>
	<div class="playlist">
		<div class="null"></div>
		<div class="title" @click="goback"><span><=歌单广场</span></div>
		<router-link tag="div" :to="{name:'Secondsonglist',params:{id:box.id}}" class="box" v-for="(box,index) in playlists" :key="index">
			<div class="img"><img :src="box.coverImgUrl+'?param=80y80'"/></div>
			<p>{{box.name}}</p>
			<span class="iconfont icon-bofang">{{box.playCount}}</span>
		</router-link>
	</div>
</template>

<script>
	export default{
		data(){
			return{
//				goback:'',
				url:'',
				playlists:[]
			}
		},
		mounted(){
			var url = this.HOST+'/top/playlist?limit=100&order=hot'
			this.$axios.get(url)
			.then(res =>{
				this.playlists = res.data.playlists
				for(var i = 0; i<this.playlists.length;i++){
					var temp = this.playlists[i].playCount;
					var n = temp.toString();
					if(n.length>5){
						var new_n = temp/10000;
						this.playlists[i].playCount = parseInt(new_n) + "万";
					}
//					console.log(this.result[i].playCount);
				}
//				console.log(res.data.playlists)
			})
		},
		methods:{
			goback(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style>
	.playlist{
		display: flex;
		flex-wrap: wrap;
		background: #fff;
	}
	.playlist .title{
		width: 670px;
		height: 50px;
		position: fixed;
		background: #fff;
		z-index: 2;
	}
	.playlist .title span{
		display: inline-block;
		margin: 10px;
	}
	.playlist .null{
		width: 100%;
		height: 50px;
	}
	.playlist .box{
		display: inline;
		width: 90px;
		height: 120px;
		margin: 8px auto;
		margin-bottom: 0;
	}
	.playlist .box .img{
		margin: 0 5px;
	}
	.playlist .box img{
		width: 80px;
		height: 80px;
		filter: brightness(80%);
	}
	.playlist .box p{
		width: 80;
		height: 39px;
		overflow: hidden;
		margin: 0 5px;
		font-size: 10px;
	}
	.playlist .box span{
		width: 80px;
		font-size: 10px;
		text-align: right;
		display: inline-block;
		color: white;
		position: relative;
		z-index: 1;
		top: -125px;
	}
</style>