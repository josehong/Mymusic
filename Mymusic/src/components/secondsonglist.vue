<template>
	<div class="secondsonglist">
		<div class="title"><span @click="goback"><=歌单</span></div>
		<div class="null"></div>
		<div class="background" v-if="result">
				<img :src="songlist[0].al.picUrl+'?param=100y100'" />
				<p class="name">{{listname.name}}</p>
				<p class="author">{{listname.creator.nickname}}</p>
				<i><img :src="listname.creator.avatarUrl"/></i>
				<span>{{listname.playCount}}</span>
		</div>
		<div class="background" v-else></div>
		<div class="box"v-if="result">
			<div @click="sendsongid(temp.id)" class="singerlist_in" v-for="(temp,index) in songlist" :key = "index">
				<div class="singlist_img"><img :src="temp.al.picUrl+'?param=100y100'" /></div>
				<div class="content">
					<p class="sing">{{temp.name}}</p>
					<p class="name">{{temp.ar[0].name}}</p>
				</div>
			</div>
		</div>
		<div class="box"v-else>
			<div class="nologin">
				<p>登录获得喜欢音乐</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				result:false,
				songlist:[],
				listname:'',
				id:''
			}
		},
		mounted(){
			if(this.$route.params.id != null){
				this.$store.commit('sendurl',this.$route.params.id)
			}
				var url = this.HOST+'/playlist/detail?id='+this.$store.state.playlistid
				this.$axios.get(url)
				.then(res =>{
					if(res.data.code = 200){
						this.result = true
						this.songlist = res.data.playlist.tracks
						this.listname = res.data.playlist
//						console.log(this.listname)
					}
					
					var temp = this.listname.playCount;
					var n = temp.toString();
					if(n.length>5){
						var new_n = temp/10000;
						this.listname.playCount = parseInt(new_n) + "万";
					}
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
	.secondsonglist{
		background: #fff;
	}
	.secondsonglist .title{
		width: 100%;
		max-width: 670px;
		height: 50px;
		position: fixed;
		z-index: 2;
		background: #fff;
	}
	.secondsonglist .title span{
		margin: 10px;
		display: inline-block;
	}
	.secondsonglist .null{
		/*width: 670px;*/
		height: 50px;
	}
	.secondsonglist .background{
		height: 200px;
		background: #020535;
	}
	
	.secondsonglist .background img{
		margin: 40px 10px 0 20px;
		filter: brightness(80%);
		
	}
	.secondsonglist .background p{
		color: #fff;
		overflow: hidden;
		position: relative;
	}
	.secondsonglist .background .name{
		width: 180px;
		height: 40px;
		font-size: 14px;
		bottom: 90px;
		left: 130px;
	}
	.secondsonglist .background .author{
		width: 180px;
		height: 13px;
		color: #fff;
		font-size: 10px;
		bottom: 80px;
		left: 160px;
	}
	.secondsonglist .background i{
		width: 20px;
		height: 20px;
		
	}
	.secondsonglist .background i img{
		width: 20px;
		height: 20px;
		margin: 0;
		position: relative;
		bottom: 100px;
		left: 135px;
		border-radius: 100%;
	}
	.secondsonglist .background span{
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
	.secondsonglist .box{
		width: 100%;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		padding-top:30px;
		background: #fff;
		border-radius: 20px;
		position: relative;
		bottom: 20px;
	}
	.secondsonglist .box .nologin{
		width: 670px;
		height: 820px;
	}
	.secondsonglist .box .nologin p{
		width: auto;
		text-align: center;
		margin-top: 50px;
	}
	.secondsonglist .box i{
		font-size: 14px;
		color: red;
		position: relative;
		top: 30px;
		right: 280px;
	}
	.secondsonglist .box .singerlist_in{
		width: 300px;
		height: 50px;
		margin: 5px 0 0 10px;
		/*background: red;*/
	}	
	.secondsonglist .box .singlist_img{
		width: 50px;
		float: left;
	}
	.secondsonglist .box img{
		width: 50px;
		height: 50px;
		/*margin-left: 5px;*/
	}
	.secondsonglist .box .singerlist_in .content{
		float: left;
	}
	.secondsonglist .box .singerlist_in p{
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
	.secondsonglist .box .singerlist_in .sing{
		font-size: 12px;
	}
	.secondsonglist .box .singerlist_in .name{
		font-size: 10px;
	}
</style>