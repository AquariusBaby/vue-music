<template>
	<div class="songList">
		<div :style="{backgroundColor: skinColor}" class="header">
			
			<div class="back">
				<div class="icon-back"><i @click="back()"></i></div>
			</div>

			<div class="title">
				<div class="name">新歌榜</div>
			</div>

			<div class="search">
				<div class="icon-search" style="text-align:center;" @click=toSearch()><i></i></div>
			</div>

		</div>
		<div class="back_img">
			<b class="title">云音乐</b>
			<h3>{{rankName}}</h3>
			<b class="time">最近更新：4月20日</b>
		</div>
		<div class="list">
			<div v-for="(item ,index) of songList" @click="playMusic(index,item.songname,item.albumpic_small,item.url)"  class="music-info">
				<div class="music-name">{{item.songname}}</div>
				<div class="music-singer">{{item.singername}}</div>
				<i class="icon-listening"></i>
			</div>
		</div>

		<VFooter></VFooter>
	</div>

	
</template>
<script>
import VFooter from '../Footer/Footer.vue'
import { mapGetters } from 'vuex'
	export default {
		data() {
			return {

			}
		},
		components: {
			VFooter
		},
		mounted() {
			this.$store.dispatch('showMiniMusic',false);
		},
		computed: mapGetters([
			'skinColor','songList','rankName'
		]),
		methods: {
			playMusic(index, name, imgSrc, src){
				this.$store.dispatch('playMusic',{name: name,musicImgSrc: imgSrc,src: src});
				this.$store.dispatch('showMiniMusic',true);
				this.$store.dispatch('addMusic',{name: name,musicImgSrc: imgSrc,src: src});
			},
			back(){
				this.$store.dispatch('showIndex',true);
				this.$store.dispatch('showDetail',false);
				this.$store.dispatch('showMiniMusic',true);
				this.$store.dispatch('showRank',false);
			},
			toSearch(){
				this.$router.push('/find');
				this.$store.dispatch('showIndex',true);
				this.$store.dispatch('showDetail',false);
				this.$store.dispatch('showMiniMusic',true);
				this.$store.dispatch('showRank',false);
			}
		}
	}
</script>
<style scoped>
	.songList .header {
		width: 100%;
		height: 2rem;
		line-height: 2rem;
		position: fixed;
		top: 0;
		left: 0;
		background-color: red;
		z-index: 100;
	}
	.songList .header:after {
		content: '';
		clear: both;
	}
	.songList .header .back {
		width: 2rem;
		height: 2rem;
		display: inline-block;
		float: left;
	}
	.songList .header .back .icon-back i {
		display: inline-block;
		background: url('./back.svg') no-repeat;
		background-size: contain;
		width: 1rem;
		height: 1rem;
		vertical-align: middle;
		margin-left: 10px;
	}
	.songList .header .title {
		width: 11rem;
		height: 2rem;
		display: inline-block;
		float: left;
		font-size: 19px;
		font-weight: bold;
		color: #fff;
		letter-spacing: 2px;
	}
	.songList .header .title .name {
		width: 100%;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.songList .header .search {
		width: 2rem;
		height: 2rem;
		display: inline-block;
		float: left;
	}
	.songList .header .search .icon-search i {
		display: inline-block;
		background: url('./search.svg') no-repeat;
		background-size: contain;
		width: 1rem;
		height: 1rem;
		vertical-align: middle;
	}
	.songList .back_img {
		width: 100%;
		height: 8rem;
		padding-top: 2rem;
		margin-top: 2rem;
		background-color: #a5cece;
	}
	.songList .back_img b.title {
		font-size: 22px;
		color: gray;
		margin: .5rem .8rem;
		height: 1rem;
		display: block;
	}
	.songList .back_img h3 {
		font-size: 40px;
		color: #fff;
		margin: .5rem .8rem;
		letter-spacing: 3px;
		font-family: '宋体';
	}
	.songList .back_img b.time {
		font-size: 18px;
		color: #888;
		margin: .5rem .8rem;
		height: 1rem;
		display: block;
		font-weight: normal;
	}
	.songList .list {
		margin-bottom: 2.5rem;
	}
	.songList .list .music-info {
		position: relative;
		flex: 1;
		padding: 8px 10px;
	}
	.songList .list .music-info .music-name {
		width: 250px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
	}
	.songList .list .music-info .music-singer {
	    padding-top: 3px;
	    font-size: 50%;
	    color: gray;
	}
	.songList .list .music-info i {
        position: absolute;
        display: inline-block;
        width: 13px;
        height: 13px;
    }
    .songList .list .music-info  i.icon-listening {
        background: url('./listening.svg') no-repeat;
        background-size: contain;
        right: 20px;
        top: 22px;
        animation: listening 1s linear infinite;
    }
</style>