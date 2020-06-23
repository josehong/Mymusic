<template>
	<div class="search">
		<span @click="goback"><=</span>
		<input type="text" v-model="search" placeholder="输入搜索的歌名" />
		<span @click="searchclick">O</span>
		<div class="hotsearch" @click="hotsearch(temp.searchWord)" v-if="ifnull" v-for="(temp,index) in searchlist" :key="index">
			<p class="name">{{temp.searchWord}}</p>
			<p class="recommend">{{temp.content}}</p>
			<i class="num">{{index+1}}</i>
			<i class="score">{{temp.score}}</i>
			<img :src="temp.iconUrl" />
		</div>
		<div class="hotsearch" @click="sendsongid(temp.id)" v-for="(temp,index) in result" :key="index">
			<p class="name">{{temp.name}}</p>
			<p class="recommend">{{temp.artists[0].name}}</p>
			<i class="num">{{index+1}}</i>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				search:'',
				searchlist:[],
				ifnull:true,
				result:[]
			}
		},
		mounted(){
//			hotsearch("陈壹千")
			var url = this.HOST + '/search/hot/detail'
			this.$axios.get(url)
			.then(res => {
				this.searchlist = res.data.data
//				console.log(res.data.data)
			})
			.catch(error =>{
				console.log(error)
			})
		},
		methods:{
			goback(){
				this.$router.go(-1)
			},
			searchclick(){ 
				if(this.search != ''){
					this.ifnull = false
					var searchurl = this.HOST + '/search?keywords= '+this.search
					this.$axios.get(searchurl)
					.then(res => {
						this.result = res.data.result.songs
					})
					.catch(error =>{
						console.log(error)
					})
				}
				
			},
			hotsearch(data){
				this.ifnull = false
				this.search = data
				var searchurl = this.HOST + '/search?keywords= '+this.search
				this.$axios.get(searchurl)
				.then(res => {
					this.result = res.data.result.songs
				})
				.catch(error =>{
					console.log(error)
				})
			},
			sendsongid(songid){
				this.$store.commit('setsongid',songid)
				this.$store.commit('setsonglist',this.result)
			}
		}
	}
</script>

<style>
	.search{
		background: #fff;
	}
	.search input{
		width: 80%;
		height: 30px;
		margin: 20px auto;
		border-bottom: 1px #555 solid;
	}
	.search .hotsearch{
		width: 90%;
		height: 40px;
		margin: 0 auto;
		padding-top: 10px;
		border-bottom: 1px #55555511 solid;
	}
	.search .hotsearch p{
		margin-left:30px ;
	}
	.search .hotsearch .name{
		font-size: 14px;
		font-weight: bold;
	}
	.search .hotsearch .recommend{
		font-size: 10px;
	}
	.search .hotsearch .num{
		width: 20px;
		height: 20px;
		text-align: center;
		font-size: 14px;
		display: inline-block;
		position: relative;
		bottom: 30px;
	}
	.search .hotsearch .score{
		width: 50px;
		height: 13px;
		font-size: 10px;
		display: inline-block;
		position: relative;
		left: 80%;
		bottom: 20px;
		text-align: right;
	}
	.search .hotsearch img{
		height: 14px;
		position: relative;
		left: 71%;
		bottom: 35px;
	}
</style>