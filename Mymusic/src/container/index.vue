<template>
	<div class="index">
		<el-drawer
		  direction = "ltr"
		  :modal = "false"
		  size="40%"
		  custom-class="usermemu"
		  :with-header="false"
		  :visible.sync="drawer">
		  
		  <div class="user_msg">
		  	<div class="back"><span @click="close"><=</span></div>
		  	<div class="user">
		  		<img :src="avatarUrl+'?param=80y80'" v-if="result"/>
		  		
		  		<span class="username" v-if="result">{{nickname}}</span>
				<span class="username" v-else>您还没有登陆呢</span>
				<span class="level" v-if="result">Lv.{{level}}</span>
		  	</div>
		  </div>
		  <div class="memu">
		  	<div class="data" >
		  		<p>我的歌单：{{createdPlaylistCount}}</p>
		  		<p>收藏歌单：{{subPlaylistCount}}</p>
		  		<p>收藏M V：{{mvCount}}</p>
		  		<p>关注歌手：{{artistCount}}</p>
		  		<p>关注电台：{{djRadioCount}}</p>
		  		<p>账号创建：{{createTime}}</p>
		  				
		  		
		  	</div>
		  	<div class="login" v-if="result"></div>
		  	<div class="login" v-else>
		  		<input type="number" class="userlogin id" placeholder="输入已注册的手机号登录" v-model="phonenumber"/>
		  		<input type="password" class="userlogin"placeholder="输入密码" v-model="pass"/>
		  	</div>
		  	<input type="button" class="button" @click="logout" v-if="result" value="退出登录"/>
		  	<input type="button" class="button" @click="login" v-else value="登录"/>
		  	<input type="button" class="button" value="日间模式"/>
		  	<input type="button" class="button" value="夜间模式"/>
		  </div>
		  
		</el-drawer>
		<div class="music-nav">
		<ul>
			<li @click="drawer = true" type="primary">点我</li>
			<router-link tag='li' to='/mine'>我的</router-link>
			<router-link tag='li' to='/home'>发现</router-link>
			<router-link tag='li' to='/dj'>电台</router-link>
			<router-link tag='li' to='/mv'>MV</router-link>
			<router-link tag='li' to='/search'>搜索</router-link>
		</ul>
	</div>
	<div class="none"></div>
		<keep-alive>
			<router-view v-on:opened="acceptmsg"/>
		</keep-alive>
		
	</div>
</template>

<script>
	export default{
		
		data(){
			return{
				drawer: false,
				result:false,
				phonenumber:'',
				pass:'',
				userid:'',
				avatarUrl:'',
				nickname:'',
				level:'',
				createdPlaylistCount:'				登',
				subPlaylistCount:'				录',
				mvCount:'					获',
				artistCount:'			得',
				djRadioCount:' 		数',
				createTime:'     据',
				open:'',
			}
		},
		mounted(){
			var url_0 = this.HOST+'/login/refresh'
			this.$axios.get(url_0)
			.then(res =>{
				
//				console.log(res.data)
				
				if(res.data.msg != '需要登录'){
					
				
				
				
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
					var date = new Date(res.data.createTime);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			        var Y = date.getFullYear() + '-';
			        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			        var D = date.getDate() + ' ';
			        var h = date.getHours() + ':';
			        var m = date.getMinutes() + ':';
			        var s = date.getSeconds();
			        this.createTime = Y+M+D+h+m+s;
//					console.log(res.data)
				})
				.catch(error=>{
					console.log(error)
				})
				
				var url_2 =  this.HOST + '/user/subcount'
				this.$axios.get(url_2)
				.then(res =>{
					this.artistCount = res.data.artistCount
					this.createdPlaylistCount = res.data.createdPlaylistCount
					this.djRadioCount = res.data.djRadioCount
					this.mvCount = res.data.mvCount
					this.subPlaylistCount = res.data.subPlaylistCount
//						console.log(res.data.artistCount);
				})
				.catch(error=>{
					console.log(error)
				})
				
			})
			.catch(error=>{
				console.log(error)
			})
			
			}
			})
				.catch(error=>{
					console.log(error)
				})
			
		},
		methods: {
	      close() {
	            this.drawer=false
//	            location.reload();
	      },
	      acceptmsg:function(msg){
	      	this.drawer = msg;
	      },
	      login(){
	      	console.log(this.phonenumber)
	      	var url_3 = this.HOST +'/login/cellphone?phone='+this.phonenumber+'&password='+this.pass
	      	this.$axios.get(url_3)
	      	.then(res =>{
	      		console.log(res.data.msg)
	      		})
	      	.catch(error=>{
					console.log(error)
				})
	      	setTimeout(function(){
	      		location.reload();
	      	},1000)
//	      	location.reload();
			
	      },
	      logout(){
	      	var url_4 = this.HOST +'/logout'
	      	this.$axios.get(url_4)
	      	.then(res =>{
	      		console.log(res.data)
	      		})
	      	.catch(error=>{
					console.log(error)
				})
//	      	location.reload();
	      	var stop = setInterval(function(){
	      		location.reload();
	      	},1)
	      	setTimeout(function(){
	      		clearInterval(stop)
	      	},1000)
	      }
	    }
		
	}
</script>

<style>
	.index{
		background: #fff;
		color: #000;
	}
	.index .none{
		width: 100%;
		height: 60px;
	}
	.index .music-nav{
		position: fixed;
		z-index: 999;
		top: 0;
		right: 0;
		left: 0;
		max-width: 670px;
		height: 60px;
		margin: 0 auto;
		background: #fff;
	}
	.index .music-nav ul{
		height: 40px;
		display: flex;
		padding: 10px 20px;
		/*margin-top: 10px;*/
	}
	.index .music-nav ul li{
		flex: 1;
		line-height: 40px;
		text-align: center;
		
	}
	.index .router-link-active{
		font-size: 16px;
		font-weight: bold;
	}
	.index .el-drawer__wrapper{
		margin: 0 auto;
		/*position: fixed;*/
		width: 670px;
		height: 1000px;
	}
	.index .usermemu{
		/*background: #555;*/
	}
	.index .user_msg{
		width: 268px;
		height: 150px;
		background: #020535;
		color: #FFFFFF;
	}
	.index .user_msg .back{
		width: 268px;
		height: 30px;
		text-align: right;
	}
	.index .user_msg .back span{
		margin: 8px 20px 0 0;
		display: inline-block;
	}
	.index .user_msg .user{
		width: 268px;
		height: 50px;
	}
	.index .user_msg .user img{
		width: 50px;
		height: 50px;
		border-radius: 100%;
		margin-left: 20px;
	}
	.index .user_msg .user .username{
		width: 180px;
		display: inline-block;
		position: relative;
		bottom: 10px;
		font-size: 14px;
	}
	.index .user_msg .user .level{
		width: 30px;
		height: 15px;
		line-height: 15px;
		text-align: center;
		background: #888;
		display: inline-block;
		border-radius: 10px;
		position: relative;
		bottom: 30px;
		left: 80px;
		font-size: 12px;
	}
	.index .memu{
		width: 268px;
		height: 100%;
		background: #fff;
		border-radius: 15px;
		position: relative;
		bottom: 10px;
		padding-top:20px ;
	}
	.index .memu .login{
		width: 268px;
		height: 120px;
	}
	.index .memu .data p{
		margin: 0 10px;
		font-size: 14px;
	}
	.index .memu .data{
		width: 268px;
		height: 150px;
	}
	.index .memu input{
		/*background: red;*/
		margin: 10px 34px;
		border: 1px solid #555;
		border-radius: 10px;
	}
	.index input::-webkit-outer-spin-button,
	.index input::-webkit-inner-spin-button{
	    -webkit-appearance: none !important;
	    margin: 0; 
	}
	.index input[type="number"]{-moz-appearance:textfield;}
	
	.index .memu .userlogin{
		width: 198px;
		height: 38px;
		overflow: hidden;
	}
	.index .memu .id{
		/*margin-top: 100px;*/
	}
	.index .memu .button{
		width: 200px;
		height: 40px;
	}
</style>