<template>
	<div class="block_1">
			<div class="title_new">
				<!--<span class="recommend_list">推荐歌单</span>-->
				<span class="choose_carefully">最新专辑</span>
				<!--<span class="more">查看更多</span>-->
			</div>
			<div class="content">
				<div class="box">
					<router-link tag="div" :to="{name:'Album',params:{id:box_item.id}}" class="box_in" v-for="(box_item,box_index) in result" :key="box_index">
						<img :src="box_item.picUrl+'?param=100y100'" />
						<p>{{box_item.name}}   -    {{box_item.artist.name}}</p>
						<!--<span class="iconfont icon-bofang">{{box_item.playCount}}</span>-->
					</router-link>
				</div>
			</div>
		</div>
</template>

<script>
	export default{
		data(){
			return{
				result:[],
			}
		},
		mounted(){
			var url = this.HOST + '/album/newest';
			this.$axios.get(url)
			.then(res => {
				var temp = res.data.albums;
				for(var i = 0; i<6;i++){
					this.result.push(temp[i]);
//					console.log(this.result[i]);
				}
				
//				this.result = res.data.albums;
				
//					console.log(this.result[1].artist.name);
				
			})
			
			.catch(error => {
				console.log(error);
			})
		}
	}
</script>

<style>
	.block_1 .title_new{
		height: 30px;
	}
</style>