<template>
	<div class="jd">
		<div class="block">
		     <swiper ref="mySwiper" :options="swiperOptions">
		    <swiper-slide v-for="(item,index) in banners" :key="index">
		    	<a :href="item.url">
		    	<i>{{item.typeTitle}}</i>
		    	<img :src="item.pic"/>
		    	</a>
		    </swiper-slide>
		    <div class="swiper-pagination" slot="pagination"></div>
		  </swiper>
		</div>
		<Main />
	</div>
</template>

<script>
	import Main from '@/components/dj/main.vue'
	export default{
		name:'dj',
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
			var url = this.HOST + '/dj/banner';
			this.$axios.get(url)
			.then(res => {
				this.banners = res.data.data;
//				console.log(this.banners);
				
			})
			.catch(error => {
				console.log(error);
			})
		}
	}
</script>

<style>
		.block{
		min-width: 320px;
		min-height: 118.5px;
	}
	.block i{
		height: 25px;
		line-height: 22px;
		padding:  0 20px 0 10px;
		background: red;
		border-radius: 15px;
		font-size: 12px;
		position: absolute;
		color: #ffffff;
		display: block;
		bottom: -5px;
		right: -10px;
	}
</style>