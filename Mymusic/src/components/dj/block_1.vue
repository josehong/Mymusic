<template>
	<div class="block_1">
			<div class="title_new">
				<span class="choose_carefully">推荐电台</span>
				<!--<span class="more">查看更多</span>-->
			</div>
			<div class="content">
				<div class="box">
					<div class="box_in" v-for="(box_item,box_index) in result" :key="box_index">
						<img :src="box_item.picUrl+'?param=100y100'" />
						<p>{{box_item.name}}</p>
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
			var url = this.HOST + '/personalized/djprogram';
			this.$axios.get(url)
			.then(res => {
				this.result = res.data.result;
//					console.log(this.result[i].playCount);
				
			})
			
			.catch(error => {
				console.log(error);
			})
		}
	}
</script>

<style>
	.block_1{
		height: 170px;
		margin-top: 10px;
		
	}
	.block_1 .title{
		height: 45px;
	}
	.block_1 .recommend_list{
		font-size: 10px;
		display: block;
		margin-left: 10px;
	}
	.block_1 .choose_carefully{
		height: 22px;
		line-height: 25px;
		text-align: center;
		font-size: 14px;
		/*color: #000000;*/
		font-weight: bold;
		margin-left: 10px;
	}
	.block_1 .more{
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
	.block_1 .content{
		/*width: 900px;*/
		height: 128px;
		overflow-y: hidden;
		overflow-x: visible;
		-ms-overflow-style:none;
		overflow:-moz-hidden-unscrollable;
	}
	.block_1 .content::-webkit-scrollbar {
        display: none;
    }
	.block_1 .box{
		width: 665px;
		margin: 0 5px;
	}
	.block_1 .box_in{
		width: 100px;
		height: 130px;
		float: left;
		margin: 0 5px;
	}
	.block_1 .box_in img{
		border-radius:8% ;
		filter: brightness(80%);
	}
	.block_1 .box_in p{
		height: 30px;
		margin-top: 2px;
		font-size: 10px;
/*		color: #000000;*/
	}
	.block_1 .box_in span{
		width: 95px;
		font-size: 10px;
		text-align: right;
		display: inline-block;
		color: white;
		position: relative;
		z-index: 1;
		top: -135px;
		/*right: -55px;*/
	}
</style>