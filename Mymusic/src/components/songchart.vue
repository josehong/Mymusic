<template>
	<div class="songchart">
		<div class="title"><span @click="goback"><=排行榜</span></div>
		<div class="null"></div>
		<div class="box">
			<router-link tag="div" :to="{name:'Secondsonglist',params:{id:temp.playlist.id}}" class="songlist_in" v-for="(temp,index) in playlist" :key = "index">
				<div class="songlist_img"><img :src="temp.playlist.coverImgUrl+'?param=100y100'" /><span>{{temp.playlist.name}}</span></div>
				<div class="content">
					<p>1、{{temp.playlist.tracks[0].ar[0].name}}-{{temp.playlist.tracks[0].name}}</p>
					<p>2、{{temp.playlist.tracks[1].ar[0].name}}-{{temp.playlist.tracks[1].name}}</p>
					<p>3、{{temp.playlist.tracks[2].ar[0].name}}-{{temp.playlist.tracks[2].name}}</p>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				playlist:[]
			}
		},
		mounted(){
			for(let i = 0;i<33;i++){
				var url = this.HOST+'/top/list?idx='+i
				this.$axios.get(url)
				.then(res =>{
//					for(var j = 0;j <= 33;j++){
						this.playlist.push({playlist:res.data.playlist})
//						console.log(this.playlist[j].name)
//						console.log(res.data.playlist.tracks[3])
//				console.log(i)
//					}
//					console.log(this.playlist)
				})
				.catch(error => {
					console.log(error);
				})
			}
//			for(var k= 0;k<=33;k++){
				console.log(this.playlist)
//			}
		},
		methods:{
			goback(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style>
	.songchart .title{
		width: 100%;
		max-width: 670px;
		height: 50px;
		position: fixed;
		z-index: 2;
		background: #fff;
	}
	.songchart .title span{
		margin: 10px;
		display: inline-block;
	}
	.songchart .null{
		width: 100%;
		max-width: 670px;
		height: 50px;
	}
	.songchart .box{
		height: 100%;
		background: #fff;
		display: flex;
		flex-wrap: wrap;
	}
	.songchart .box i{
		font-size: 10px;
		/*position: relative;
		bottom: 55px;
		left: 65px;*/
	}
	.songchart .box .songlist_in{
		width: 300px;
		height: 100px;
		margin: 5px 0 5px 10px;
		/*background: red;*/
	}	
	.songchart .box .songlist_img{
		width: 100px;
		float: left;
	}
	.songchart .box img{
		width: 100px;
		height: 100px;
		filter: brightness(80%);
		/*margin-left: 5px;*/
	}
	.songchart .box .songlist_img span{
		width: 95px;
		height: 13px;
		margin-left: 5px;
		overflow: hidden;
		font-size: 10px;
		position: relative;
		bottom: 20px;
		color: white;
		display: inline-block;
	}
	.songchart .box .songlist_in .content{
		float: left;
	}
	.songchart .box .songlist_in p{
		width: 185px;
		height: 13px;	
		overflow: hidden;
		font-size: 10px;
		margin-top: 15px;
		margin-left: 15px;
		/*position: relative;
		bottom: 50px;
		left: 60px;*/
	}
</style>