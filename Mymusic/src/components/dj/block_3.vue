<template>
	<div class="block_1">
			<div class="title_new">
				<!--<span class="recommend_list">推荐歌单</span>-->
				<span class="choose_carefully">创作  | 翻唱</span>
				<!--<span class="more">查看更多</span>-->
			</div>
			<div class="content">
				<div class="box">
					<div class="box_in" v-for="(box_item,box_index) in result" :key="box_index">
						<img :src="box_item.picUrl+'?param=100y100'" />
						<p>{{box_item.lastProgramName}}   -    {{box_item.name}}</p>
						<!--<span class="iconfont icon-bofang">{{box_item.playCount}}</span>-->
					</div>
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
			var url = this.HOST + '/dj/recommend/type?type=2001';
			this.$axios.get(url)
			.then(res => {
				var temp = res.data.djRadios;
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