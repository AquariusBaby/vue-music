<template>
	<transition name="showRouter">
		<div class="music-list">
			<div class="music-item" v-for="(item,index) in musicData" @click.stop.prevent="toggleMusic(index)">
				<img :src="item.musicImgSrc || 'https://microzz.com/img/avatar.jpg'" class="music-img" alt="">
				<span class="music-name">{{ (index+1)+'.&nbsp;'+item.name}}</span>
				<span class="del-icon" @click.stop="del(index)"></span>
			</div>
			<div class="tips">没有更多歌曲啦!</div>
		</div>
	</transition>
</template>
<script>
import { mapGetters } from 'vuex'
	export default {
		name:'MusicList',
		beforeCreate() {
			this.$store.dispatch('showMiniMusic',true);
		},
		mounted() {
			//this.$store.dispatch('getData');
			//this.nativeAudio=document.getElementsByTagName('audio')[0];
		},
		computed: mapGetters([
			'musicData','isPlaying','audio','DOM'
		]),
		data(){
			return {
				//nativeAudio:{}
			}
		},
		methods: {
			//点击切换歌曲
			toggleMusic(index) {
				this.$store.dispatch('showMiniMusic',true);
				if(this.audio.index===index){
					this.DOM.audio.paused ? this.DOM.audio.play() : this.DOM.audio.pause();
       				this.$store.dispatch('play', !this.isPlaying);

				}else{
					/*this.$store.dispatch('toggleMusic',index);
					this.nativeAudio.src=this.audio.src;
					console.log(this.nativeAudio.src,this.nativeAudio.paused);
					this.nativeAudio.play();
					this.$store.dispatch('play',true);*/
					this.DOM.audio.play();
        			this.$store.dispatch('play', true);
				}
				this.$store.dispatch('toggleMusic', index);
			},
			//删除歌曲
			del(index) {
				this.$store.commit('del', index);
			}
		}
	}
</script>
<style scoped>
	.showRouter-enter-active {
		transition: all .4s ease;
	}
	.showRouter-leave-active {
		transition: all 0 ease;
	}
	.showRouter-enter,.showRouter-leave-active {
		transform: translateX(-150px);
		opacity: 0;
	}
	.music-list {
		padding: 4px 4px 0 4px;
		flex: 8;
		overflow: auto;
		margin: 3.5rem 0 2.5rem 0;
	}
	.music-list .music-item {
		border-top: 1px solid rgba(0,0,0,.1);
		padding: 4px 6px 0 6px;
		position: relative;
		margin-bottom: 4px;
		border-width: 50%;
	}
	.music-list .music-item:nth-child(1) {
		border: none;
	}
	.music-list .music-item .music-img {
		width: 2rem;
		height: 2rem;
		border-radius: 5px;
	}
	.music-list .music-item span.music-name {
		display: inline-block;
		width: 65%;
		vertical-align: middle;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		padding-left: 1rem;
	}
	.music-list .music-item span.del-icon {
		display: inline-block;
		position: absolute;
		top: .7rem;
		width: 1rem;
		height: 1rem;
		background: url('./del.svg');
		background-size: contain;
	}
	.music-list .tips {
		text-align: center;
		margin: 0.5rem auto;
		width: 100%;
		color: gray;
	}
</style>