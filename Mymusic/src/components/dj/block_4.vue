<template>
	<div class="block_2_1">
			<div class="title_4">
				<span class="choose_carefully">3D | 电子</span>
			</div>
			<div class="content">
				<div class="box">
					<div class="box_in"v-for="(box_item,box_index) in result" :key="box_index">
						<img :src="box_item.picUrl+'?param=50y50'">
						<i class="song">{{box_item.lastProgramName}}</i>
						<i class="name">{{box_item.name}}</i>
						<span class="iconfont icon-bofang1"></span>
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
				artists:[]
			}
		},
		mounted(){
			var url = this.HOST + '/dj/recommend/type?type=10002';
			this.$axios.get(url)
			.then(res => {
				var temp = res.data.djRadios;
				for(var i = 0; i<9;i++){
					this.result.push(temp[i]);
//					console.log(this.result[i]);
				}
//				var temp = res.data.playlist.tracks;
//				for(var i = 0; i<9;i++){
//					var s_name = [];
//					for(var j = 0; j<temp[i].ar.length;j++){
//						s_name[j] = temp[i].ar[j].name;
//					}
//					this.result.push({name:temp[i].name,id:temp[i].id,picUrl:temp[i].al.picUrl,s_name:s_name.join("/")});
//					console.log(res.data.djRadios);
//					this.result = res.data.djRadios;
//				};
			})
			
			.catch(error => {
				console.log(error);
			})
		}
	}
</script>

<style>
	.block_2_1 .title_4{
		height: 30px;
	}
</style>