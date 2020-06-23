<template>
	<div class="block_2_1">
			<div class="title_new">
				<!--<span class="recommend_list">推荐歌曲</span>-->
				<span class="choose_carefully">节目榜</span>
				<!--<span class="more">查看更多</span>-->
			</div>
			<div class="content">
				<div class="box">
					<div class="box_in"v-for="(box_item,box_index) in result" :key="box_index">
						<img :src="box_item.program.coverUrl+'?param=50y50'">
						<i class="song">{{box_item.program.name}}</i>
						<i class="name">{{box_item.program.mainSong.artists[0].name}}</i>
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
			var url = this.HOST + '/dj/program/toplist?limit=9';
			this.$axios.get(url)
			.then(res => {
				var temp = res.data.toplist;
				for(var i = 0; i<9;i++){
					this.result.push(temp[i]);
//					console.log(this.result[i]);
				}
//				console.log(res.data.toplist[0].program.coverUrl);
			})
			
			.catch(error => {
				console.log(error);
			})
		}
	}
</script>

<style>
	.block_2_1{
		height: 180px;
		margin-top: 10px;
		
	}
	.block_2_1 .title{
		height: 45px;
	}
	.block_2_1 .recommend_list{
		font-size: 10px;
		display: block;
		margin-left: 10px;
	}
	.block_2_1 .choose_carefully{
		height: 22px;
		line-height: 25px;
		text-align: center;
		font-size: 14px;
		/*color: #000000;*/
		font-weight: bold;
		margin-left: 10px;
	}
	.block_2_1 .more{
		width: 70px;
		height: 18px;
		line-height: 18px;
		text-align: center;
		font-size: 12px;
		color: #444444;
		font-weight: bold;
		float: right;
		margin-right: 20px;
		border: 1px solid #999999;
		border-radius: 20px;
	}
	.block_2_1 .content{
		height: 155px;
		overflow-y: hidden;
		overflow-x: visible;
		-ms-overflow-style:none;
		overflow:-moz-hidden-unscrollable;
	}
	.block_2_1 .content::-webkit-scrollbar {
        display: none;
    }
	.block_2_1 .box{
		width: 1000px;
		margin: 0 5px;
	}
	.block_2_1 .box_in{
		width: 320px;
		height: 50px;
		float: left;
		margin: 1px 5px;
	}
	.block_2_1 .box_in img{
		width: 45px;
		margin: 2px 10px;
		border-radius: 5px;
		
	}
	.block_2_1 .box_in .song{
		width: 200px;
		display: inline-block;
		margin-top: 2px;
		font-size: 12px;
		font-weight: bold;
		/*color: #000000;*/
		position: relative;
		bottom: 5px;
	}
	.block_2_1 .box_in .name{
		width: 200px;
		display: inline-block;
		margin-top: 2px;
		font-size: 10px;
		color: #555;
		position: relative;
		bottom: 30px;
		left: 75px;
	}
	.block_2_1 .box_in span{
		font-size: 25px;
		color: red;
		position: relative;
		top: -35px;
		left: 80px;
	}
</style>