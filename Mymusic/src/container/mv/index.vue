<template>
	<div class="mv">
		<div class="box_mv">
			<div class="title"><span>MV精选</span></div>
			<div class="box_content">
				<div class="content_in" v-for="(result,index) in results" :key ='index'>
					<img :src="result.picUrl+'?param=150y85'"/>
					<p>{{result.artistName}}  -  {{result.name}}</p>
					<span class="iconfont icon-bofang">{{result.playCount}}</span>
				</div>
				<div class="content_in content_one"></div>
				<div class="content_in content_one"></div>
			</div>
		</div>
		<sticky-slot class="stickyTop">
			<div class="mv_nav">
				<ul>
					<router-link tag='li' to='/mv/new_mv'>最新</router-link>
					<router-link tag='li' to='/mv/list_mv'>排行榜</router-link>
				</ul>
			</div>
		</sticky-slot>
		<keep-alive>
			<router-view/>
		</keep-alive>
		
	</div>
</template>

<script>
	import stickySlot from './stickySlot.vue'
	export default{
		data(){
			return{
				results:[]
			}
		},
		components: {
	      stickySlot
	    },
		mounted(){
			var url = this.HOST + '/personalized/mv';
			this.$axios.get(url)
			.then(res =>{
				this.results = res.data.result
				for(var i = 0; i<this.results.length;i++){
					var temp = this.results[i].playCount;
					var n = temp.toString();
					if(n.length>5){
						var new_n = temp/10000;
						this.results[i].playCount = parseInt(new_n) + "万";
					}
				}
//				console.log(res.data)
			})
			.catch(error =>{
				console.log(error);
			})
		}
	}
</script>

<style>
	.box_mv .title{
		height: 30px;
		/*background: red;*/
	}
	.box_mv .title span{
		font-size: 14px;
		font-weight: bold;
		margin-left: 10px;
	}
	.box_mv .box_content{
		/*padding: auto;*/
		display: flex;
		flex-wrap: wrap;
	}
	.box_mv .content_in{
		margin: 5px auto;
		width: 150px;
		height: 120px;
	}
	.content_hidden{
		/*background: red;*/
	}
	@media screen and (max-device-width: 445px){
		.box_mv .content_one{
			display: none;
		}
	}
	@media screen and (min-device-width: 600px){
		.box_mv .content_one{
			display: none;
		}
	}
	.box_mv .content_in img{
		border-radius:8% ;
		filter: brightness(90%);
	}
	.box_mv .content_in p{
		width: 145px;
		height: 28px;
		overflow: hidden;
		font-size: 10px;
		margin-left: 5px;
		margin-top: 5px;
	}
	.box_mv .content_in span{
		width: 145px;
		font-size: 10px;
		text-align: right;
		display: inline-block;
		color: white;
		position: relative;
		z-index: 1;
		bottom: 120px;
	}
	.stickyTop {
	    top: 60px;
	    z-index: 10;
	  }
	.mv_nav{
		/*position: fixed;*/
		margin-top: 10px;
		height: 30px;
		padding: 0 100px;
		background: #fff;
	}
	.mv_nav ul{
		height: 30px;
		display: flex;
	}
	.mv_nav ul li{	
		text-align: center;
		flex:1;
	}
	.mv_nav .router-link-active{
		font-size: 16px;
		font-weight: bold;
		color: red;
	}
</style>