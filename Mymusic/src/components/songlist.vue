<template>
	<div class="songlist">
		<div class="title"><span @click="goback"><=每日推荐</span></div>
		<div class="null"></div>
		<div class="background">
			<div class="background_img">
				<img v-if="result" :src="songlist[0].album.picUrl+'?param=300y150'" />
			</div>
		</div>
		<div class="box"v-if="result">
			<div @click="sendsongid(temp.id)" class="singerlist_in" v-for="(temp,index) in songlist" :key = "index">
				<div class="singlist_img"><img :src="temp.album.picUrl+'?param=100y100'" /></div>
				<div class="content">
					<p class="sing">{{temp.name}}</p>
					<p class="name">{{temp.artists[0].name}}</p>
				</div>
			</div>
		</div>
		<div class="box"v-else>
			<div class="nologin">
				<p>登录获得推荐音乐</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				result:false,
				songlist:[]
			}
		},
		mounted(){
				var url = this.HOST+'/recommend/songs'
				this.$axios.get(url)
				.then(res =>{
					if(res.data.code = 200){
						this.result = true
						this.songlist = res.data.recommend
//						console.log(this.songlist)
					}
					
//					for(var j = 0;j <= 33;j++){
//						this.singerlist = res.data.list.artists
//						console.log(this.playlist[j].name)
//						console.log(res.data.code)
				
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
			},
			sendsongid(songid){
				this.$store.commit('setsongid',songid)
				this.$store.commit('setsonglist',this.songlist)
			}
		}
	}
</script>

<style>
	.songlist{
		background: #fff;
	}
	.songlist .title{
		width: 100%;
		max-width: 670px;
		height: 50px;
		position: fixed;
		z-index: 2;
		background: #fff;
	}
	.songlist .title span{
		margin: 10px;
		display: inline-block;
	}
	.songlist .null{
		width: 100%;
		max-width: 670px;
		height: 50px;
	}
	.songlist .background{
	}
	.songlist .background .background_img{
		margin: 0 auto;
	}
	.songlist .background .background_img img{
		width: 670px;
	}
	.songlist .box{
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		padding-top:30px;
		background: #fff;
		border-radius: 20px;
		position: relative;
		bottom: 20px;
	}
	.songlist .box .nologin{
		width: 670px;
		height: 820px;
	}
	.songlist .box .nologin p{
		width: auto;
		text-align: center;
		margin-top: 50px;
	}
	.songlist .box i{
		font-size: 14px;
		color: red;
		position: relative;
		top: 30px;
		right: 280px;
	}
	.songlist .box .singerlist_in{
		width: 300px;
		height: 50px;
		margin: 5px 0 0 10px;
		/*background: red;*/
	}	
	.songlist .box .singlist_img{
		width: 50px;
		float: left;
	}
	.songlist .box img{
		width: 50px;
		height: 50px;
		/*margin-left: 5px;*/
	}
	.songlist .box .singerlist_in .content{
		float: left;
	}
	.songlist .box .singerlist_in p{
		width: 235px;
		height: 15px;	
		overflow: hidden;
		/*font-size: 10px;*/
		margin-top: 8px;
		margin-left: 15px;
		/*position: relative;
		bottom: 50px;
		left: 60px;*/
	}
	.songlist .box .singerlist_in .sing{
		font-size: 12px;
	}
	.songlist .box .singerlist_in .name{
		font-size: 10px;
	}
</style>