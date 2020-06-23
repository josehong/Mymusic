<template>
	<div class="singersonglist">
		<div class="title"><span @click="goback"><=歌手</span></div>
		<div class="null"></div>
		<div class="background">
				<img :src="listname.picUrl+'?param=100y100'" />
				<p class="name">{{listname.name}}</p>
				<p class="author">{{listname.briefDesc}}</p>
				<!--<i><img :src="listname.creator.avatarUrl"/></i>-->
				<!--<span>{{listname.playCount}}</span>-->
		</div>
		<div class="box">
			<div class="singerlist_in" @click="sendsongid(temp.id)" v-for="(temp,index) in songlist" :key = "index">
				<span>{{index+1}}</span>
				<div class="content">
					<p class="sing">{{temp.name}}</p>
					<p class="name">{{temp.ar[0].name}}</p>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
				songlist:[],
				listname:[],
				id:''
			}
		},
		mounted(){
			if(this.$route.params.id != null){
				this.$store.commit('sendurl',this.$route.params.id)
			}
				var url = this.HOST+'/artists?id='+this.$store.state.playlistid
				this.$axios.get(url)
				.then(res =>{
					
						
						this.songlist = res.data.hotSongs
						this.listname = res.data.artist
//						console.log(this.songlist)
					
					
//					var temp = this.listname.playCount;
//					var n = temp.toString();
//					if(n.length>5){
//						var new_n = temp/10000;
//						this.listname.playCount = parseInt(new_n) + "万";
//					}
	//					console.log(this.result[i].playCount);
					
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
	.singersonglist{
		background: #fff;
	}
	.singersonglist .title{
		width: 100%;
		max-width: 670px;
		height: 50px;
		position: fixed;
		z-index: 2;
		background: #fff;
	}
	.singersonglist .title span{
		margin: 10px;
		display: inline-block;
	}
	.singersonglist .null{
		/*width: 670px;*/
		height: 50px;
	}
	.singersonglist .background{
		height: 200px;
		background: #020535;
	}
	
	.singersonglist .background img{
		margin: 40px 10px 0 20px;
		filter: brightness(80%);
		
	}
	.singersonglist .background p{
		color: #fff;
		overflow: hidden;
		position: relative;
	}
	.singersonglist .background .name{
		width: 180px;
		height: 40px;
		font-size: 14px;
		bottom: 90px;
		left: 130px;
	}
	.singersonglist .background .author{
		width: 60%;
		height: 50px;
		color: #fff;
		font-size: 10px;
		bottom: 80px;
		left: 130px;
	}
	.singersonglist .background i{
		width: 20px;
		height: 20px;
		
	}
	.singersonglist .background i img{
		width: 20px;
		height: 20px;
		margin: 0;
		position: relative;
		bottom: 100px;
		left: 135px;
		border-radius: 100%;
	}
	.singersonglist .background span{
		width: 95px;
		height: 12px;
		text-align: right;
		display: inline-block;
		color: #fff;
		font-size: 10px;
		position: relative;
		bottom: 155px;
		right: 5px;
	}
	.singersonglist .box{
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		padding-top:30px;
		background: #fff;
		border-radius: 20px;
		position: relative;
		bottom: 20px;
	}
	.singersonglist .box .nologin{
		/*width: 670px;*/
		height: 820px;
	}
	.singersonglist .box .nologin p{
		width: auto;
		text-align: center;
		margin-top: 50px;
	}
	.singersonglist .box i{
		font-size: 14px;
		color: red;
		position: relative;
		top: 30px;
		right: 280px;
	}
	.singersonglist .box .singerlist_in{
		width: 300px;
		height: 50px;
		margin: 5px 0 0 10px;
		/*background: red;*/
	}	
	.singersonglist .box .singerlist_in span{
		width: 16px;
		height: 16px;
		text-align: right;
		display: inline-block;
		font-size: 12px;
		position: relative;
		right: 260px;
		top: 10px;
	}
	.singersonglist .box .singerlist_in .content{
		float: left;
	}
	.singersonglist .box .singerlist_in p{
		width: 235px;
		height: 15px;	
		overflow: hidden;
		/*font-size: 10px;*/
		margin-top: 8px;
		margin-left: 30px;
		/*position: relative;
		bottom: 50px;
		left: 60px;*/
	}
	.singersonglist .box .singerlist_in .sing{
		font-size: 12px;
	}
	.singersonglist .box .singerlist_in .name{
		font-size: 10px;
	}
</style>