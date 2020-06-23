<template>
	<div class="home">
	<!--<Nav />-->
		<div class="block">
		     <swiper ref="mySwiper" :options="swiperOptions">
		    <swiper-slide v-for="(item,index) in banners" :key="index">
		    	<i :style="'background: '+item.titleColor">{{item.typeTitle}}</i>
		    	<a :href="item.url"><img :src="item.imageUrl"/></a>
		    </swiper-slide>
		    <div class="swiper-pagination" slot="pagination"></div>
		  </swiper>
		</div>
		<div class="found-nav">
			<ul>
				<router-link tag='li' to='/Songlist'>
					
						<span class="iconfont icon-rili"></span>
						<i>每日推荐</i>
				</router-link>
				<router-link tag='li' to='/Playlist'>
						<span class="iconfont icon-gedan"></span>
						<i >歌单</i>
				</router-link>
				<router-link tag='li' to='/Songchart'>
						<span class="iconfont icon-_huabanfuben"></span>
						<i>排行榜</i>
				</router-link>
				<router-link tag='li' to='/Singerlist'>
						<span class="iconfont icon-_huabanfuben"></span>
						<i>歌手榜</i>
				</router-link>
			</ul>
		</div>
		<Main />
		<router-view/>
	</div>
</template>

<script>
	import Main from '@/components/home/main.vue'
	import '@/assets/font/iconfont.css'
	export default{
		name: 'carrousel',
		data(){
			return{
				banners:[],
				swiperOptions: {
					autoplay:true,
		          	pagination: {
		           		el: '.swiper-pagination'
		          	},
		          // Some Swiper option/callback...
		        }
			}
		},
		components:{
			Main
		},	
		mounted(){
			var url = this.HOST + '/banner';
			this.$axios.get(url)
			.then(res => {
				this.banners = res.data.banners;
//				console.log(this.banners);
				
			})
			.catch(error => {
				console.log(error);
			});
			var url_2 = this.HOST + '/personalized?limit=6';
			this.$axios.get(url_2)
			.then(res => {
				this.result = res.data.result;
				for(var i = 0; i<this.result.length;i++){
					var temp = this.result[i].playCount;
					var n = temp.toString();
					if(n.length>4){
						var new_n = temp/10000;
						this.result[i].playCount = parseInt(new_n) + "万";
					}
//					console.log(this.result[i].playCount);
				}
			})
			
			.catch(error => {
				console.log(error);
			})
		}
	}
</script>

<style scoped>
	.block{
		min-width: 320px;
		min-height: 118.5px;
	}
	.block i{
		height: 25px;
		line-height: 22px;
		padding:  0 20px 0 10px;
		border-radius: 15px;
		font-size: 12px;
		position: absolute;
		color: #ffffff;
		display: block;
		bottom: -5px;
		right: -10px;
	}
	.found-nav{
		margin-top: 10px;
		height: 60px;
	}
	.found-nav ul{
		height: 60px;
		display: flex;
		padding: 0 50px;
		font-size: 14px;
		/*color: white;*/
		
	}
	.found-nav ul li{
		flex: 1;
		text-align: center;
		font-weight: 400;
		overflow: hidden;

	}
	.found-nav ul li span{
		width: 40px;
		height: 40px;
		line-height: 40px;
		font-size: 20px;
		display: block;
		text-align: center;
		margin: auto;
		background: red;
		border-radius: 50%;
		color: #FFFFFF;
	}
	.found-nav ul li i{
		font-size: 10px;
/*		color: #555;*/
	}
	
</style>