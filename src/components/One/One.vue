<template>
	<div>
		<div class="top">
			<div @click="showDetail(3,'欧美排行榜')" class="item">欧美排行榜</div>
			<div @click="showDetail(5,'内地排行榜')" class="item">内地排行榜</div>
			<div @click="showDetail(6,'港台排行榜')" class="item">港台排行榜</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				rank: ['欧美排行榜','内地排行榜','港台排行榜'],
				topNum: [3,5,6]
			}
		},
		methods: {
			showDetail(num,str) {
				var _this=this;
				this.axios.get('http://120.26.57.9:8080/vue-music/TopMusic?topid='+num).then(res => {
					console.log(res);
					//res.data.showapi_res_body.pagebean.songlist
					_this.$store.dispatch('getSongList',res.data.showapi_res_body.pagebean.songlist);
					_this.$store.dispatch('rankName',str);
					/*_this.songlist=res.data.showapi_res_body.pagebean.songlist;
					console.log(_this.songlist);*/
				}).catch(error => {
					console.log(error.type);
				});
				this.$store.dispatch('showIndex',false);
				this.$store.dispatch('showDetail',false);
				this.$store.dispatch('showRank',true);
			}
		}
	}
</script>
<style scoped>
	.top {
		margin: 4rem 0 2.5rem 0;
	}
	.top .item {
			background-color: red;
			width: 13rem;
			height: 2rem;
			margin: 10px auto;
			text-align: center;
			line-height: 2rem;
			border-radius: 7px;
	}
</style>