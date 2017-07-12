<template>
	<transition name="fade">
		<div v-show="isShowMiniMusic" :style="{backgroundColor: skinColor}" class="footer">
			<div @click="showPlay()" class="mini-music">
				<div class="music-img">
					<img :src="audio.musicImgSrc || (musicData[0]&&musicData[0].musicImgSrc) || defaultImg" alt="">
				</div>
				<div class="music-name">
					<p>{{audio.name || (musicData[0]&&musicData[0].name) || 'Powered by microzz.com'}}</p>
					<div class="progress">
						<span class="start">{{transformTime(now)}}</span>
						<div @click.stop="changeTime($event)" @touchmove.stop="touchMove($event)" ref="progressBar" class="progress-bar">
							<div :style="{width: (now/totalTime)*100+'%'}" ref="now" class="now"></div>
						</div>
						<span class="end">{{transformTime(totalTime)}}</span>
					</div>
				</div>
				<div class="music-control">
					<i @click.stop="play()" :class="[isPlaying?pauseIcon:playIcon]"></i>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
import { mapGetters } from 'vuex'
	export default {
		data(){
			return {
				playIcon: 'play-icon',
				pauseIcon: 'pause-icon',
				now: 0,
				totalTime: 0,
				progress: 0,
				nativeAudio: {},
				defaultImg: 'https://microzz.com/img/avatar.jpg'
			}
		},
		mounted() {
			/*var _this=this;
			//this.nativeAudio = document.getElementsByTagName('audio')[0];
			this.nativeAudio.addEventListener('play', () => {
				//console.log(_this.nativeAudio,this.nativeAudio.duration);
				this.nativeAudio.oncanplay = function () {
    				console.log('进入可播放状态,音频总长度:' + this.duration);
    				_this.totalTime= this.duration;
				};
				//this.totalTime=this.nativeAudio.duration;
				setInterval(() => {
					_this.now = _this.nativeAudio.currentTime;
					//console.log(_this.totalTime);
					_this.progress = _this.totalTime;	//最好做个判断，totalTime初始为0，不能为被除数
					if(_this.now==_this.progress){
						_this.$store.dispatch('play',false);
					}
				},1000);
			});*/
			this.nativeAudio = document.querySelector('audio');

    		this.nativeAudio.addEventListener('play', () => {
    			console.log(this.nativeAudio);
    			this.totalTime = this.nativeAudio.duration;
    			this.nativeAudio.oncanplay = function() {
    				this.totalTime = this.nativeAudio.duration;
    			}
      		
			    setInterval(() => {
			        this.now = this.nativeAudio.currentTime;
			        this.progress = this.totalTime;
			    }, 1000);

    		})
		},
		computed: mapGetters([
			'isShowMiniMusic','musicData','skinColor',
			'isPlaying','audio','isShowAsideMenu','DOM'
		]),
		methods: {
			play() {
				this.$store.dispatch('play',!this.isPlaying);
				!this.isPlaying ? this.DOM.audio.pause(): this.DOM.audio.play();
			},
			transformTime(seconds) {
				let m,s;
				m=Math.floor(seconds/60);
				m = m.toString().length == 1 ? ('0' + m) : m;
			    s = Math.floor(seconds - 60 * m);
			    s = s.toString().length == 1 ? ('0' + s) : s;
			    return m + ':' + s;
			},
			changeTime(event) {
				let progressBar = this.$refs.progressBar;
				let coordStart = progressBar.getBoundingClientRect().left;
				let coordEnd = event.pageX;
				this.nativeAudio.currentTime = (coordEnd-coordStart)/progressBar.offsetWidth*this.totalTime;
				this.now = this.nativeAudio.currentTime;
				this.nativeAudio.play();
				this.$store.dispatch('play',true);
			},
			touchMove(event) {
				let progressBar = this.$refs.progressBar;
				let coordStart = progressBar.getBoundingClientRect().left;
				let coordEnd = event.touches[0].pageX;
				this.$refs.now.style.width=((coordEnd-coordStart)/progressBar.offsetWidth).toFixed(3) *100+'%';
			},
			touchEnd(event) {
				this.nativeAudio.currentTime = this.$refs.now.style.width.replace('%','')/100*this.totalTime;
				this.now = this.nativeAudio.currentTime;
				this.nativeAudio.play();
				this.$store.commit('play',true);
			},
			showPlay() {
				if(this.isShowAsideMenu) {
					return ;
				}
				this.$store.dispatch('showMiniMusic',false);
				this.$store.dispatch('showIndex',false);
				this.$store.dispatch('showDetail',true);
				this.$store.dispatch('showRank',false);
			}
		}
	}
</script>
<style scoped>
	.fade-enter-active {
		transition: all .3s ease-in-out;
	}
	.fade-leave-active {
		transition: all .3s cubic-beazier(1.0,0.5,0.8,1.0);
	}
	.fade-enter,.fade-leave-active {
		transform: translateY(50px);
		opacity: 0;
	}
	.footer {
		width: 100%;
		height: 2.5rem;
		text-align: center;
		position: fixed;
		bottom: 0;
		left: 0;
	}
	.footer .mini-music {
		display: flex;
		line-height: 2.5rem;
	}
	.footer .mini-music .music-img {
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.footer .mini-music .music-img img {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		background-size: contain;
	}
	.footer .mini-music .music-name {
		flex: 5;
		color: #fff;
		overflow: hidden;
		position: relative;
		width: 100%;
	}
	.footer .mini-music .music-name p {
		position: absolute;
		top: 0;
		width: 100%;
		text-align: center;
		z-index: 1;
		height: 1.2rem;
		line-height: 1.3rem;
		overflow: hidden;
		white-space: nowrap;
	}
	.footer .mini-music .music-name .progress {
		position: absolute;
		width: 100%;
		top: 1.2rem;
		left: 0;
		height: 1.3rem;
		line-height: 1rem;
	}
	.footer .mini-music .music-name .progress span.start {
		position: absolute;
		left: 0.4rem;
	}
	.footer .mini-music .music-name .progress span.end {
		position: absolute;
		right: 0.4rem;
	}
	.footer .mini-music .music-name .progress .progress-bar {
		position: relative;
		width: 50%;
		height: 5px;
		display: inline-block;
		background-color: rgba(255,255,255,.5);
		vertical-align: 2px;
		border-radius: 3px;
	}
	.footer .mini-music .music-name .progress .now {
		position: absolute;
		left: 0;
		display: inline-block;
		height: 5px;
		background-color: #333;
	}
	/* .footer .mini-music .music-name .progress .now::after {
		content: '';
		position: absolute;
		left: 0;
		top: -1px;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background-color: #555;
	} */
	.footer .mini-music .music-control {
		flex: 1.5;
	}
	.footer .mini-music .music-control i {
		padding-right: 0.2rem;
		width: 2.2rem;
		height: 2.2rem;
		margin-top: 0.2rem;
		display: inline-block;
		border-radius: 50%;
	}
	.footer .mini-music .music-control i.play-icon {
		background: url(./play.svg) no-repeat;
		background-size: contain;
	}
	.footer .mini-music .music-control i.pause-icon {
		background: url(./pause.svg) no-repeat;
		background-size: contain;
	}
</style>