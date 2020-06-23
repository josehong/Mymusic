<template>
	<div class="singerlist">
		<div class="title"><span @click="goback"><=歌手榜</span></div>
		<div class="null"></div>
		<div class="box">
			<router-link tag="div" :to="{name:'Singersonglist',params:{id:temp.id}}" class="singerlist_in" v-for="(temp,index) in singerlist" :key = "index">
				<i>{{index+1}}、</i>
				<div class="singlist_img"><img :src="temp.picUrl+'?param=100y100'" /></div>
				<div class="content">
					<p>{{temp.name}}</p>
					<p></p>
					<p>{{temp.score}}</p>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				singerlist:[]
			}
		},
		mounted(){
				var url = this.HOST+'/toplist/artist'
				this.$axios.get(url)
				.then(res =>{
//					for(var j = 0;j <= 33;j++){
						this.singerlist = res.data.list.artists
//						console.log(this.playlist[j].name)
//						console.log(res.data.playlist.tracks[3])
//				console.log(i)
//					}
//					console.log(this.singerlist)
				})
				.catch(error => {
					console.log(error);
				})
			
//			for(var k= 0;k<=33;k++){
//				console.log(this.playlist)
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
	.singerlist .title{
		width: 100%;
		max-width: 670px;
		height: 50px;
		position: fixed;
		z-index: 2;
		background: #fff;
	}
	.singerlist .title span{
		margin: 10px;
		display: inline-block;
	}
	.singerlist .null{
		width: 100%;
		max-width: 670px;
		height: 50px;
	}
	.singerlist .box{
		height: 100%;
		background: #fff;
		display: flex;
		flex-wrap: wrap;
	}
	.singerlist .box i{
		width: 39px;
		text-align: right;
		display: inline-block;
		font-size: 14px;
		color: red;
		position: relative;
		top: 30px;
		right: 285px;
	}
	.singerlist .box .singerlist_in{
		width: 300px;
		height: 80px;
		margin: 5px 0 5px 40px;
		/*background: red;*/
	}	
	.singerlist .box .singlist_img{
		width: 80px;
		float: left;
	}
	.singerlist .box img{
		width: 80px;
		height: 80px;
		/*margin-left: 5px;*/
	}
	.singerlist .box .singerlist_in .content{
		float: left;
	}
	.singerlist .box .singerlist_in p{
		width: 150px;
		height: 13px;	
		overflow: hidden;
		font-size: 10px;
		margin-top: 12px;
		margin-left: 15px;
		/*position: relative;
		bottom: 50px;
		left: 60px;*/
	}
</style>