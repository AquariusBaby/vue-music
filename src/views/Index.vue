<template>
	<div>
		<div class="fixed-bar">
			<mu-appbar>
				<div class="logo" slot="left"></div>
				<mu-icon-button icon='search' solt="right" />
			</mu-appbar>
			<mu-tabs :value="activeTab" class="view-tabs" @change="handleTabChange(activeTab)">
				<mu-tab value="rage" title="时下流行"></mu-tab>
				<mu-tab value="songList" title="歌单"></mu-tab>
				<mu-tab value="leaderBoard" title="排行榜"></mu-tab>
				<mu-tab value="hotSinger" title="热门歌手"></mu-tab>
			</mu-tabs>
		</div>
		<div class="default-view" :class="{view: 1 > 0}">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	export default {
		data () {
			return {
				activeTab: 'rage'
			}
		},
		created () {
			console.log(this.$route.path);
			var tmpArr = this.$route.path.split('/');
			console.log(tmpArr);
			if (tmpArr[1] === 'index') {
				this.handleTabChange(tmpArr[2]);
				console.log(tmpArr[2]);
			}
		},
		watch: {
			'$route' (to, from) {
				const path = to.path;
				console.log(path);
				var tmpArr = path.split('/');
				if (tmpArr[1] ==='index'){
					this.handleTabChange(tmpArr[2]);
				}
			}
		},
		methods: {
			handleTabChange (val) {
				this.activeTab = val;
				this.$router.push({ path: '/index/' + 'rage' });
				console.log(val);
			}
		},
		computed: {
			...mapGetters([
				'songList'
			])
		}
	}
</script>
<style lang="less" scoped>
  @import "../assets/theme.less";
  .logo {
    width: 150px;
    height: 48px;
    background: url("../../static/logo.png") no-repeat left center;
    background-size: cover;
  }
  .view-tabs {
  	background-color:#fff;
  	color:rgba(0,0,0,.87);
  	>.mu-tab-link {
  		color:rgba(102,102,102,1);
  	}
  	>.mu-tab-active {
  		color:@primaryColor;
  	}
  }

  .fixed-bar {
  	position: fixed;
  	width:100%;
  	top:0;
  	left:0;
  	z-index:15;
  }
  .default-view {
  	margin-top: 104px;
  }
  .view {
  	margin-bottom: 2.3rem;
  }
</style>