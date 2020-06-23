<template>
	<div class="play">
		<audio ref="playsong" autoplay :src="songurl"></audio>
		<!-- {{this.getkey()}} -->
		<div class="box" v-if="ifsonglist">
			<div class="drawer">
				<el-drawer direction = "btt" :modal = "false" size="100%" custom-class="usermemu" :with-header="false" :visible.sync="drawer">
					<div class="background" :style="'background: url('+songpic+'?param=200y500) 0% 0% / cover no-repeat rgba(0,0,0,.3);'"></div>
			  		<span @click="goback"><=</span>
					<p class="song">{{songname}}</p>
					<p class="name">{{songauthor}}</p>
					<div class="img">
						<div class="piece">
							<img class="album" :style="lp" src="https://s3.music.126.net/mobile-new/img/disc_default.png?param=200y200" />
							<img class="loop" :style="lp" src="https://s3.music.126.net/mobile-new/img/disc-ip6.png?param=200y200" />
							<img class="pic" :style="lp" :src="songpic+'?param=200y200'" />
						</div>
						<div class="pointer_box" :class="pointer">
							<img class="pointer" src="https://s3.music.126.net/mobile-new/img/needle-ip6.png" />
						</div>
					</div>
					<div class="lrc">
						<p></p>
						<p></p>
						<p></p>
						<p></p>
						<p :style="lrc_p" class= item.index v-for="(item,key,index) in lrcdata" :key="index">{{item}}{{setlrcsrcol(key,index)}}</p>
					</div>
					<div class="btn">
						<i class="currentTime">{{setDate(currentTime)}}</i>
						<el-slider v-model="currentTime" :show-tooltip="false" :max="audioLength" @change="changeaudioTime"></el-slider>
						<i class="audioLength">{{setDate(audioLength)}}</i>
						<div class="play_btn">
							<span @click="setrepeat" v-if="repeat">重复</span>
							<span @click="setrepeat" v-else>循环</span>
							<span @click="getprevioussong"><</span>
							<span @click="play">=</span>
							<span @click="getnextsong">></span>
							<span @click="setlike" v-if="like">喜欢</span>
							<span @click="setlike" v-else>不喜欢</span>
						</div>
					</div>
				</el-drawer>
			</div>
			<div class="playmusic" @click="drawer = true">{{$store.state.playlistid}}--{{$store.state.songid}}</div>
			<span @click="play"> ===</span>
			<span @click="setsonglist">@</span>
		</div>
		<div class="songlist" v-else>
			<div class="songlisttitle">
				<span @click="hidden"><</span>
			</div>
			<div class="list"></div>
			<div class="list" v-for="(temp,index) in songlist" :key="index">
				<i class="songname">{{temp.name}}</i>
				<i class="songauthor" v-if="artiststype">{{temp.ar[0].name}}</i>
				<i class="songauthor" v-else>{{temp.artists[0].name}}</i>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				drawer: false,
				temp:'',
				lp:'',
				pointer:'on',
				currentTime:0,
				audioLength:0,
				songname:'',
				songauthor:'',
				songpic:'',
				songurl:'',
				ifsonglist:true,
				songlist:[],
				artiststype:true,
				repeat:false,
				likelist:[],
				like:false,
				clicklike:false,
				lrcdata:{},
				lrc_p:''
			}
		},
		mounted(){
//			this.addEventListeners()
			var likelisturl = this.HOST + '/likelist'
			this.$axios.get(likelisturl)
			.then(res=>{
				this.likelist = res.data.ids
			})
			.catch(error =>{
				console.log(error)
			})
			this.settimeout()
			this.setAudioInterval()
			this.$refs.playsong.currentTime = this.$store.state.timehistory
		},
		methods:{
			goback(){
				this.drawer = false
			},
			play(){
				if(this.lp == ''){
					this.lp = 'animation-play-state: paused;'
					this.pointer = 'off'
					this.$refs.playsong.pause()
				}else{
					this.lp = ''
					this.pointer = 'on'
					this.$refs.playsong.play()
				}
			},
			
//			addEventListeners(){
//				this.$refs.playsong.addEventListener('timeupdate',this._currentTime)
//				this.$refs.playsong.addEventListener('canplay',this._audioLength)
//			},
//			
//			removeEventListeners(){
//				this.$refs.playsong.removeEventListener('timeupdate',this._currentTime),
//				this.$refs.playsong.removeEventListener('canplay',this._audioLength)
//			},
//			
//			_currentTime(){
//				this.currentTime = parseInt(this.$refs.playsong.currentTime)
//			},
//			
//			_audioLength(){
//				this.audioLength =  parseInt(this.$refs.playsong.duration)
//			},
//			
			changeaudioTime(val) {
	            this.$refs.playsong.currentTime = val;
      		},
      		setDate(time){
      			var m = parseInt(time/60);
      			if(m<10){
      				m = '0'+m
      			}
			    var s = time;
			    s = s-m*60
			    if(s<10){
			    	 s = '0'+s
			    }
			    return m+':'+s
      		},
      		settimeout(){
      			setTimeout(()=>{
      				this.getsongmsg(this.$store.state.songid)
					this.getsongurl(this.$store.state.songid)
      			},1)
      		},
      		setAudioInterval(){
      			
      			setInterval(()=>{
      				this.audioLength = parseInt(this.$refs.playsong.duration);
      		 		this.currentTime = parseInt(this.$refs.playsong.currentTime);
					   this.$store.commit('settimehistory',this.currentTime);
      		 		
      				if(this.audioLength == this.currentTime && this.audioLength != 0 && this.currentTime !=0 && !this.repeat){
      		 			for(var i = 0;i<this.$store.state.songlist.length;i++){
      		 				if(this.$store.state.songlist[i].id == this.$store.state.songid){
		      		 			if(i<this.$store.state.songlist.length-1){
		      		 				this.$store.commit('setsongid',this.$store.state.songlist[i+1].id);
		      		 			}else if(i == this.$store.state.songlist.length-1){
		      		 				this.$store.commit('setsongid',this.$store.state.songlist[0].id);
		      		 			}
      		 					break;
      		 				}
      		 			}
      		 			
      		 		}
      		 		if(this.$store.state.songid != this.$store.state.oldsongid){
      		 			this.getsongmsg(this.$store.state.songid)
						this.getsongurl(this.$store.state.songid)
						this.$store.commit('setoldsongid',this.$store.state.songid)
						this.getlrc();
						
      		 		}
      		 		if(this.audioLength == this.currentTime && this.audioLength != 0 && this.currentTime !=0 && this.repeat){
      		 			this.$refs.playsong.play()
      		 		}
      		 		for(let i = 0;i<this.likelist.length;i++){
      		 			this.like = false
      		 			if(this.likelist[i] == this.$store.state.songid){
      		 				this.like = true
      		 				break
      		 			}
      		 		}
      		 	},500)
      		},
      		getsongmsg(songid){
      			var urlmsg = this.HOST + '/song/detail?ids='+ songid
				this.$axios.get(urlmsg)
				.then(res=>{
					this.songname = res.data.songs[0].name
					this.songauthor = res.data.songs[0].ar[0].name
					this.songpic = res.data.songs[0].al.picUrl
				})
				.catch(error =>{
					console.log(error)
				})
      		},
      		getsongurl(songid){
      			var urlsong = this.HOST + '/song/url?id='+ songid
				this.$axios.get(urlsong)
				.then(res=>{
					this.songurl = res.data.data[0].url
				})
				.catch(error =>{
					console.log(error)
				})
      		},
      		getnextsong(){
      			for(var i = 0;i<this.$store.state.songlist.length;i++){
      		 		if(this.$store.state.songlist[i].id == this.$store.state.songid){
      		 			if(i<this.$store.state.songlist.length-1){
      		 				this.$store.commit('setsongid',this.$store.state.songlist[i+1].id);
      		 			}else if(i == this.$store.state.songlist.length-1){
      		 				this.$store.commit('setsongid',this.$store.state.songlist[0].id);
      		 			}
      		 			
      		 			break;
      		 		}
      		 	}
      		},
      		getprevioussong(){
      			for(var i = 0;i<this.$store.state.songlist.length;i++){
      		 		if(this.$store.state.songlist[i].id == this.$store.state.songid){
      		 			if(i == 0){
      		 				this.$store.commit('setsongid',this.$store.state.songlist[this.$store.state.songlist.length-1].id);
      		 			}else{
      		 				this.$store.commit('setsongid',this.$store.state.songlist[i-1].id);
      		 			}
      		 			break;
      		 		}
      		 	}
      		},
      		setsonglist(){
      			this.ifsonglist = false
      			this.songlist = []
      			var tempid = []
      			var songlist = []
      			for(let i = 0;i<this.$store.state.songlist.length;i++){
      				tempid[i] = this.$store.state.songlist[i].id
      		 		var songlisturl = this.HOST+'/song/detail?ids='+this.$store.state.songlist[i].id;
      		 		this.$axios.get(songlisturl)
					.then(res=>{
//						this.songlist.push({songname:res.data.songs[0].name,songauthor:res.data.songs[0].ar[0].name,id:res.data.songs[0].id})
					})
					.catch(error =>{
						console.log(error)
					})
      		 	}
      			this.songlist = this.$store.state.songlist
      			if(this.songlist[0].ar == null){
      				this.artiststype = false
      			}else{
      				this.artiststype = true
      			}
					console.log(this.songlist[0].ar ==null )
      		},
      		hidden(){
      			this.ifsonglist = true
      		},
      		setrepeat(){
      			this.repeat = !this.repeat
      			
      		},
      		setlike(){
      			if(this.like){
      				for(let i = 0;i<this.likelist.length;i++){
      		 			if(this.likelist[i] == this.$store.state.songid){
      		 				this.likelist.splice(i,1)
      		 				break
      		 			}
      		 		}
      			}else{
      				this.likelist.push(this.$store.state.songid)
      			}
      			var likeurl = this.HOST+'/like?like='+!this.like+'&id='+this.$store.state.songid
      			this.$axios.get(likeurl)
				.then(res=>{
					console.log(res.data)
				})
				.catch(error =>{
					console.log(error)
				})
      		},
      		getlrc(){
      			var lrcurl = this.HOST+'/lyric?id='+this.$store.state.songid
      			this.$axios.get(lrcurl)
				.then(res=>{
					var lyrics = res.data.lrc.lyric.split("\n");
					var lrcobj = {};
					for(var i = 0;i<lyrics.length;i++){
						var lyric = decodeURIComponent(lyrics[i]);
						var timereg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
						var timeregexparr = lyric.match(timereg);
						if(!timeregexparr)continue;
						var clause = lyric.replace(timereg,'');
						for(var j = 0,h = timeregexparr.length;j < h;j++){
							var t = timeregexparr[j];
							var min = Number(String(t.match(/\[\d*/i)).slice(1)),
								sec = Number(String(t.match(/\:\d*/i)).slice(1));
								var time = min * 60 + sec;
								lrcobj[time] = clause;
;						}
					}
					this.lrcdata = lrcobj;
					
					// console.log(this.lrcdata)
				})
				.catch(error =>{
					console.log(error)
				})
			},
			setlrcsrcol(key,index){
				if(this.currentTime == key){
					this.lrc_p = "top:"+(-index*30)+"px;"
				}
			}
		}
	}
</script>

<style>
	.play .songlist{
		width: 100%;
		max-width: 670px;
		height: 500px;
		background: #FF0000;
		position: fixed;
		bottom: 0;
		z-index: 1000;
		overflow: auto;
		border-radius: 20px;
	}
	
	.play .songlist .songlisttitle {
		width: 100%;
		max-width: 670px;
		height: 30px;
		position: fixed;
		background: burlywood;
		z-index: 1001;
		/*bottom: 300px;*/
	}
	.play .songlist .list{
		height: 50px;
	}
	.play .songlist .list i{
		
	}
	.play .songlist .list .songname{
		font-size: 14px;
		font-weight: bold;
		margin-left: 10%;
	}
	.play .songlist .list .songauthor{
		font-size: 10px;
	}
	.play .box{
		width: 100%;
		max-width: 670px;
		height: 50px;
		background: blue;
		position: fixed;
		bottom: 0;
		z-index: 1000;
	}
	.play .el-drawer__wrapper{
		width: 100%;
		max-width: 670px;
		margin: 0 auto;
	}
	.play .background{
		width: 100%;
		max-width: 670px;
		height: 100%;
		position: fixed;
		margin: 0 auto;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		/*background: no-repeat;
		background-size: 100%;*/
		-webkit-filter: blur(15px) brightness(50%);
		filter: blur(15px) brightness(50%);
	}
	.play .drawer span{
		font-size: 16px;
		display: inline-block;
		margin-top: 20px;
		position: relative;
	}
	.play .drawer p{
		position: relative;
		overflow: hidden;
		left: 40px;
		bottom: 25px;
		color: #fff;
	}
	.play .drawer .song{
		height: 22px;
		font-size: 16px;
		font-weight: bold;
	}
	.play .drawer .name{
		height: 14px;
		font-size: 10px;
	}
	.play .drawer .img{
		width: 250px;
		height: 250px;
		margin: 40px auto;
	}
	.play .drawer .img img{
		position: relative;
		width: 250px;
		height: 250px;
		z-index: 999;
	}
	.play .drawer .piece img{
		border-radius: 100%;
		-webkit-transform: rotate-disk(360deg);
		animation: rotate-disk 25s infinite normal linear;
		/*animation-play-state: paused;*/
	}
	@keyframes rotate-disk {
	    from {-webkit-transform: rotate(0deg);}
		to {-webkit-transform: rotate(360deg);}
	}
	.play .drawer .piece .pic{
		width: 170px;
		height: 170px;
		left: 40px;
		bottom: 460px;
	}
	.play .drawer .loop{
		bottom: 250px;
	}
	.play .drawer .img .pointer_box{
		width: 140px;
		height: 200px;
		position: relative;
		z-index: 1000;
		bottom:820px;
		left: 45px;
	}
	.play .drawer .img .pointer{
		width: 70px;
		height: 100px;
		top: 100px;
		left: 70px;
	}
	@keyframes rotate-off {
	    from {-webkit-transform: rotate(0deg);}
		to {-webkit-transform: rotate(-20deg);}
	}
	@keyframes rotate-on {
	    from {-webkit-transform: rotate(-20deg);}
		to {-webkit-transform: rotate(0deg);}
	}
	.play .drawer .img .on{
		animation: rotate-on 0.5s 1 normal linear;
		animation-fill-mode: forwards;
	}
	.play .drawer .img .off{
		animation: rotate-off 0.5s 1 normal linear;
		animation-fill-mode: forwards;
	}
	.play .drawer .lrc{
		height: 300px;
		overflow: hidden;
	}
	.play .drawer .lrc p{
		left: 0;
		bottom: 0;
		width: 100%;
		height: 20px;
		line-height: 20px;
		text-align: center;
		margin-top: 10px;
	}
	.play .drawer .btn{
		width: 100%;
		max-width: 670px;
		height: 80px;
		position: fixed;
		bottom: 0;
	}
	.play .drawer .play_btn{
		width: auto;
		height: auto;
		margin: 0 auto;
		padding: 0 20px;
		display: flex;
		position: relative;
		bottom: 20px;
	}
	.play .drawer .play_btn span{
		flex: 1;
		text-align: center;
		color: #fff;
		/*margin: 0;*/
	}
	
	.el-slider__runway{
		width: 75%;
		height: 3px;
		background: #a9a9a9;
		margin: 0 auto;
	}
	.el-slider__bar{
		height: 3px;
		background: #eee;
	}
	.el-slider__button{
		width: 5px;
		height: 5px;
		border: 1px solid #fff;
	}
	.el-slider__button-wrapper{
		top:-16px
	}
	.play .drawer .btn i{
		font-size: 8px;
		color: #eee;
		position: relative;
	}
	.play .drawer .btn .currentTime{
		top: 9px;
		left: 4.5%;
	}
	.play .drawer .btn .audioLength{
		left: 90%;
		bottom: 14px;
	}
</style>