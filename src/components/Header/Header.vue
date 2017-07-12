<template>
		<div class="header">
			<div class="name">
				<span @click="showAsideMenu(true)" class="func"><i class="func-icon"></i></span>
				<p>云音乐</p>
				<span @click="toSearch()" class="search"><i class="search-icon"></i></span>
			</div>
			<div class="tab">
				<div class="item">
					<router-link to="/music-list">我的</router-link>
				</div>
				<div class="item">
					<router-link to="/find">发现</router-link>
				</div>
				<div class="item">
					<router-link to="/one">排行榜</router-link>
				</div>
			</div>
		</div>
</template>
<script>
import { mapGetters } from 'vuex'
	export default {
		name: 'header',
		data() {
			return {

			}
		},
		computed: mapGetters([
			'skinColor'
		]),
		methods: {
			toSearch() {
				this.$router.push('/find');
			},
			showAsideMenu(flag) {
				this.$store.dispatch('showAsideMenu',flag);
				/*document.body.ontouchmove=function(event){
					event.preventDefault();
				}*/
			}
		}
	}
</script>
<style scoped>
	.header {
		background-color: #B72712;
		color:white;
		width:100%;
		height: 3.5rem;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
	}
	.header .name {
			display: flex;
			justify-content: space-between;
			text-align: center;
			align-items: center;
			border-bottom: 1px solid rgba(255,255,255,.2);
			height: 2rem;
	}
	.header .name span.func,.header .name span.search {
		flex: 1;
		position: relative;
		width: 20px;
		height: 20px;
	}
	.header .name span.func i {
		display: inline-block;
		position: absolute;
		width: 20px;
		height: 20px;
		left: 15px;
		bottom: 0;
		background: url(./func.svg) no-repeat;
		background-size: contain;
	}
	.header .name p {
		flex: 1;
		font-size: 16px;
		letter-spacing: 2px;
	}
	.header .name span.search i {
		display: inline-block;
		position: absolute;
		width: 20px;
		height: 20px;
		right: 15px;
		bottom: 0;
		background: url(./search.svg) no-repeat;
		background-size: contain;
	}
	.header .tab {
		display: flex;
		border-bottom: 1px solid #9e9e9e;
		height: 1.5rem;
		font-size: 14px;
	}
	.header .tab .item {
		display: inline-block;
		flex: 1;
		text-align: center;
		line-height: 1.5rem; 
	}
	.header .tab a {
		display: inline-block;
		position: relative;
		width: 100%;
		color: #fff;
	}
	.header .tab a::after {
		background-color: rgba(255,255,255,.2);
		height: 1px;
		bottom: -2px;
	}
	.router-link-active {
		border-bottom: 2px solid #000; 
		position: absolute;
		top: -2px;
		font-size: 16px;
	}
</style>