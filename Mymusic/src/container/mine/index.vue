<template>
	<div class="mine">
		<div class="user_main" v-if="true">
			<div class="img" v-if="result"><img :src="avatarUrl+'?param=80y80'" /></div>
			<div class="img" v-else><img src="../../assets/img/4.jpg" /></div>
			<span class="username" v-if="result">{{nickname}}</span>
			<span class="username" v-else>您还没有登陆呢</span>
			<span class="level" v-if="result">Lv.{{level}}</span>
			<span class="login" v-else @click='open'>立即登录</span>
			<div class="user_list">
				<div class="list_in">
					<router-link  class="ll"tag="div" :to="{name:'Secondsonglist',params:{id:like}}" @click="userclick(like)"></router-link>
				</div>
				<div class="list_in">
					<router-link class="ll"tag="div" to='/recentplay'></router-link>
				</div>
				<div class="list_in">
					<router-link class="ll"tag="div" to='/fm'></router-link>
				</div>
			</div>
		</div>
		
		<div class="user_songlist" v-if="result">
			<p v-if="result">创建歌单</p>
			<p v-else>热门歌单</p>
			<router-link class="songlist_in" tag="div" :to="{name:'Secondsonglist',params:{id:list_u.id}}" @click="userclick(list_u.id)" v-for="(list_u,index) in userlist":key="list_u.index">
				<div class="songlist_img"><img :src="list_u.coverImgUrl+'?param=80y80'" /></div>
				<p>{{list_u.name}}</p>
				<i>{{list_u.trackCount}}首</i>
			</router-link>
			<p v-if="result">收藏歌单</p>
			<p v-else>热门歌单</p>
			<router-link class="songlist_in" tag="div" :to="{name:'Secondsonglist',params:{id:list_c.id}}" @click="userclick(list_c.id)" v-for="(list_c,index) in collect" :key="list_c.index">
				<div class="songlist_img"><img :src="list_c.coverImgUrl+'?param=80y80'" /></div>
				<p>{{list_c.name}}</p>
			</router-link>
		</div>
		<div class="user_songlist" v-else>
			<p v-if="result">创建歌单</p>
			<p v-else>热门歌单</p>
			<div class="songlist_in" v-for="(list,index) in songlist" :key="index">
				<div class="songlist_img"><img src="../../assets/img/4.jpg" /></div>
				<p>{{list.name}}</p>
				<i>收藏   {{list.usedCount}}</i>
			</div>
		</div>
	</div>
</template>

<script>
	export default{		
		data(){
			return{
				drawer: false,
				result:false,
				userid:'',
				avatarUrl:'',
				nickname:'',
				level:'',
				like:'',
				userlist:[],
				collect:[],
				songlist:[]
				
			}
		},
		methods:{
			open(){
				this.$emit("opened",true)
			},
			userclick(data){
				this.$store.state.id = data
				console.log(data)
			}
		},
		mounted(){
			var url =  this.HOST + '/login/status'
			this.$axios.get(url)
			.then(res =>{
				this.userid = res.data.profile.userId
				var nickname = res.data.profile.nickname
				this.result = true
				
				var url_1 =  this.HOST + '/user/detail?uid=' +this.userid
				this.$axios.get(url_1)
				.then(res =>{
					this.avatarUrl = res.data.profile.avatarUrl
					this.nickname = res.data.profile.nickname
					this.level = res.data.level
//					console.log(res.data)
				})
				.catch(error=>{
					console.log(error)
				})
				
				var url_2 =  this.HOST + '/user/playlist?uid=' +this.userid
				this.$axios.get(url_2)
				.then(res =>{
					this.like = res.data.playlist[0].id
//					this.$store.state.id = res.data.playlist[0].id
//					console.log(this.like)
//					this.userlist = res.data.playlist
//					this.userlist.splice(0,1)
					for(var i = 1;i<res.data.playlist.length;i++){
						if(res.data.playlist[i].creator.nickname == nickname){
							this.userlist.push(res.data.playlist[i])
						}
						if(res.data.playlist[i].creator.nickname != nickname){
							this.collect.push(res.data.playlist[i])
						}
					}
					
					for(var i = 0; i<this.userlist.length;i++){
						var temp = this.userlist[i].playCount;
						var n = temp.toString();
						if(n.length>5){
							var new_n = temp/10000;
							this.userlist[i].playCount = parseInt(new_n) + "万";
						}
	//					console.log(this.result[i].playCount);
					}
					
					for(var i = 0; i<this.collect.length;i++){
						var temp = this.collect[i].playCount;
						var n = temp.toString();
						if(n.length>5){
							var new_n = temp/10000;
							this.collect[i].playCount = parseInt(new_n) + "万";
						}
//						console.log(this.result[i].playCount);
					}
					
//					this.nickname = res.data.profile.nickname
//					this.level = res.data.level
//					console.log(res.data.playlist[12].creator.nickname = nickname)
//					console.log(this.collect)
				})
				.catch(error=>{
					console.log(error)
				})
				
			})
			.catch(error=>{
				console.log(error)
			})
			
			
			var url_3 = this.HOST+'/playlist/hot'
			this.$axios.get(url_3)
			.then(res =>{
				this.songlist = res.data.tags
				
				for(var i = 0; i<this.songlist.length;i++){
					var temp = this.songlist[i].usedCount;
					var n = temp.toString();
					if(n.length>5){
						var new_n = temp/10000;
						this.songlist[i].usedCount = parseInt(new_n) + "万";
					}
//					console.log(this.result[i].playCount);
				}
				
//				console.log(res.data.tags)
			})
			.catch(error=>{
				console.log(error)
			})
		},
		
	}
</script>

<style>
	.mine{
		width: auto;
		height: 100%;
	}
	.user_main{
		/*width: 320px;*/
		height: 200px;
		background: #020535;
		padding: 8%;
		padding-top: 20px;
		padding-bottom: 0;
	}
	.user_main .img{
		width: 80px;
		height: 80px;
	}
	.user_main img{
		width: 80px;
		height: 80px;
		border-radius: 100%;
	}
	.user_main span{
		color: white;	
	}
	.user_main .username{
		width: 180px;
		display: inline-block;
		position: relative;
		left: 90px;
		bottom: 70px;
		font-size: 14px;
	}
	.user_main .level{

		width: 30px;
		height: 15px;
		line-height: 15px;
		text-align: center;
		background: #888;
		display: inline-block;
		border-radius: 10px;
		position: relative;
		right: 90px;
		bottom: 40px;
		font-size: 12px;
	}
	.user_main .login{
		width: 80px;
		height: 20px;
		line-height: 20px;
		text-align: center;
		border: 1px solid #888;
		border-radius: 10px;
		display: inline-block;
		font-size: 14px;
		position: relative;
		left: 10%;
		bottom: 50px;
		
	}
	.user_main .user_list{
		height: 76px;
		padding: 0 10%;
		display: flex;
	}
	.user_main  .list_in{
		flex: 1;
		width: 60px;
		height: 60px;
		margin: 0 1%;
	}
	.ll{
		width: 60px;
		height: 60px;
		margin: 0 auto;
		background: blue;
	}
	.user_songlist{
		height: 100%;
		position: relative;
		bottom: 15px;
		background: #fff;
		border-radius:20px ;
		display: flex;
		flex-wrap: wrap;
	}
	.user_songlist p{
		width: 670px;
		font-size: 14px;
		margin: 20px;
		margin-bottom: 0;
	}
	.user_songlist i{
		font-size: 10px;
		position: relative;
		bottom: 55px;
		left: 65px;
	}
	.user_songlist span{
		width: 48px;
		font-size: 10px;
		text-align: right;
		display: inline-block;
		color: #fff;
		position: relative;
		z-index: 1;
		bottom: 80px;
		right: 20px;
	}
	.user_songlist .u{
		right: 20px;
	}
	.user_songlist .c{
		width: 52px;
		right: 0;
	}
	.user_songlist .songlist_in{
		width: 300px;
		height: 50px;
		margin-top: 5px;
	}
	@media screen and (max-device-width: 600px){
		.songlist_in{
			margin: 5px 10px
		}
	}
	.user_songlist img{
		width: 50px;
		height: 50px;
		filter: brightness(80%);
		margin-left: 10px;
	}
	.user_songlist .songlist_in p{
		width: 230px;
		height: 32px;
		font-size: 10px;
		margin: 0;
		margin-left: 5px;
		position: relative;
		bottom: 50px;
		left: 60px;
	}
</style>