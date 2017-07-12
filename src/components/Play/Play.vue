<template>

	<div class="play">
		<div :style="{backgroundColor: skinColor}" class="header">
		
			<div class="back">
				<div class="icon-back"><i @click="back()"></i></div>
			</div>

			<div class="title">
				<div class="name">{{audio.name}}</div>
			</div>

			<div class="list" @touchend="isShowMusicList=!isShowMusicList" >
				<div class="icon-list"><i></i></div>
			</div>

		</div>

		<div class="content">
			<transition name="fade">
				<div class="music-list" v-show="isShowMusicList">
					<ul style="max-height:300px;">
						<li @click="toggleMusic(index)" v-for="(item, index) of musicData" :class="{ activeColor: index === audio.index}">{{ (index + 1) +'. &nbsp;'+ item.name}}</li>
					</ul>
				</div>
			</transition>
			
			<img @click="isShowMusicList=fasle" :src="audio.musicImgSrc || musicData[0].musicImgSrc || defaultImg" alt="">
			<div class="img">
				<img @click="isShowMusicList=fasle" :src="audio.musicImgSrc || musicData[0].musicImgSrc || defaultImg" alt="">
			</div>

			<div class="progress">
				<div class="start-time" style="color:#000;">{{transformTime(now)}}</div>
				<div @click="changeTime($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)" ref="progressBar" class="progress-bar">
					<div :style="{width: (now/progress)*100+'%'}" ref="now" class="now"></div>
				</div>
				<div class="end-time" style="color:#000;">{{transformTime(totalTime)}}</div>
			</div>
		</div>
	
		<div :style="{backgroundColor: skinColor}" class="footer">
			<div class="prev">
				<div class="icon-prev"><i @click="prev()"></i></div>
			</div>
			<div class="play">
				<div class="icon-play"><i @click="play()" :class="[isPlaying?'pause-icon':'play-icon']"></i></div>
			</div>
			<div class="next">
				<div class="icon-next"><i @click="next()"></i></div>
			</div>
		</div>
		
		<!-- 遮罩
		<div class="cover1" v-show="isShowMusicList"></div> -->
	</div>	

</template>
<script>
import { mapGetters } from 'vuex'
import SongList from '../SongList/SongList.vue'
	export default {
		name: 'play',
		components: {
			SongList
		},
		mounted() {
			var _this=this;
			this.nativeAudio = document.getElementsByTagName("audio")[0];
			this.nativeAudio.addEventListener('play', () => {
				this.totalTime = this.nativeAudio.duration;
				this.nativeAudio.oncanplay=function(){
					_this.totalTime = this.duration;
				};
				setInterval(function(){
					_this.now = _this.nativeAudio.currentTime;
					_this.progress = _this.totalTime;	//最好做个判断，totalTime初始为0，不能为被除数
					/*if(_this.now==_this.progress){
						_this.$store.dispatch('play',false);
					}*/
				}, 1000);
			});
		},
		computed: mapGetters([
			'musicData','audio','isPlaying','skinColor','isShowDetail','DOM'
		]),
		data() {
			return {
				nativeAudio: {},
				now: 0,
				totalTime: 0,
				progress:0,
				isShowSkinColors: false,	//显示换肤
				isShowMusicList: false,      //显示小播放列表
				defaultImg: 'https://microzz.com/img/avatar.jpg'
			}
		},
		methods: {
			back() {
				this.$store.dispatch('showIndex',true);
				this.$store.dispatch('showMiniMusic',true);
				this.$store.dispatch('showDetail',false);
				this.isShowMusicList=false;
			},
			transformTime(seconds) {
				let m,s;
				m=Math.floor(seconds/60);
				m = m.toString().length == 1 ? ('0' + m) : m;
			    s = Math.floor(seconds - 60 * m);
			    s = s.toString().length == 1 ? ('0' + s) : s;
			    return m + ':' + s;
			},
			prev() {
				this.audio.index = this.audio.index ===0?this.musicData.length-1:(--this.audio.index);
				this.$store.dispatch('toggleMusic',this.audio.index);
				/*this.nativeAudio.src=this.audio.src;
				this.nativeAudio.play();
				this.$store.dispatch('play',true);*/
			},
			play() {
				this.$store.dispatch('play',!this.isPlaying);
				!this.isPlaying?this.DOM.audio.pause():this.DOM.audio.play();
			},
			next() {
				this.audio.index = this.audio.index===this.musicData.length-1?0:(++this.audio.index);
				this.$store.dispatch('toggleMusic',this.audio.index);
				/*this.nativeAudio.src=this.audio.src;
				this.nativeAudio.play();
				this.$store.dispatch('play',true);*/
			},
			changeTime(event) {
				let progressBar = this.$refs.progressBar;
				let coordStart = progressBar.getBoundingClientRect().left;
				let coordEnd = event.pageX;
				this.nativeAudio.currentTime = (coordEnd - coordStart)/progressBar.offsetWidth*this.totalTime;
				this.now = this.nativeAudio.currentTime;
				this.nativeAudio.play();
				this.$store.dispatch('play',true);
			},
			touchMove(event) {
				let progressBar = this.$refs.progressBar;
				let coordStart = progressBar.getBoundingClientRect().left;
				let coordEnd = event.touches[0].pageX;
				this.$refs.now.style.width = ((coordEnd - coordStart)/progressBar.offsetWidth).toFixed(3)*100+'%';
			},
			touchEnd(event) {
				this.nativeAudio.currentTime = this.$refs.now.style.width.replace('%','')/100*this.totalTime;
				this.now = this.nativeAudio.currentTime;
				this.nativeAudio.play();
				this.$store.dispatch('play',true);
			},
			toggleMusic(index) {
				this.$store.dispatch('toggleMusic',index);
				this.$store.dispatch('play',true);
				setTimeout(() => {
					this.isShowMusicList = flase;
				},100);
			}
		}
	}
</script>
<style scoped>
	.play .cover1 {
		width: 100%;
		height: 100%;
		z-index: 10;
		position: absolute;
		bottom: 2.3rem;
	}
	.play .slide-fade-enter-active {
		transition: all .3s ease;
	}
	.play .slide-fade-leave-active {
		transition: all .1s cubic-bezier(1.0,0.5,0.8,1.0);
	}
	.play .slide-fade-enter,.play .slide-fade-leave-active {
		transform: translateX(10px);
		opacity: 0;
	}
	.play {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
	.play .header {
		position: relative;
		z-index: 1;
		display: flex;
		height: 2rem;
		z-index: 11;
	}
	.play .header .back {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.play .header .back .icon-back i {
		display: inline-block;
		background: url('./back.svg') no-repeat;
		background-size: contain;
		width: 1rem;
		height: 1rem;
		vertical-align: middle;
	}
	.play .header .title {
		flex: 5;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 17px;
		font-weight: bold;
		color: #fff;
		letter-spacing: 1px;
	}
	.play .header .title .name {
		width: 100%;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.play .header .list {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.play .header .list .icon-list i {
		display: inline-block;
		background: url('./list.svg') no-repeat;
		background-size: contain;
		width: 1rem;
		height: 1rem;
		vertical-align: middle;
	}
	.play .content {
		position: relative;
		flex: 9;
		display: flex;
		width: 100%;
		height: 22.5rem;
		justify-content: center;
		align-items: center;
	}
	.play .content .music-list {
		position: absolute;
		z-index: 3;
		top: 0;
		right: 0;
		color: #bdbdbd;
		padding: 0;
		margin: 0;
		height: auto;
	}
	.play .content .music-list .activerColor {
		color: #FF6E40;
	}
	.play .content .music-list .fade-enter-active {
		transition: all .3s ease;
	}
	.play .content .music-list .fade-leave-active {
		transition: all .3s ease;
	}
	.play .content .music-list .fade-enter,.play .content .music-list .fade-leave-active{
		transition: translateX(10px);
		opacity: 0;
	}
	.play .content .music-list .activeColor {
		color:#ff6e40;
	}
	.play .content .music-list ul {
		height: 100%;
        overflow-y: auto;
        background: rgba(0, 0, 0, .7);
        height: 100%;
        margin: 0;
        padding: 0;
        padding-bottom: 5px;
        box-shadow: 0 0 6px #2196F3;
        border-radius: 10px 0 0 10px;
	}
	.play .content .music-list li {
		width: 260px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0.4rem 1rem;
        font-weight: 400;
	}
	.play .content .music-list li + li {
		border-top: 1px solid #616161;
	}
	.play .content img {
		position: absolute;
		z-index: 0;
		width: 100%;
		height: 100%;
		    -webkit-filter: brightness(65%) blur(8px);
    filter: brightness(65%) blur(8px);
	}
	.play .content .img {
		width: 12.5rem;
		height: 12.5rem;
	}
	.play .content .img img {
		position: relative;
		z-index: 2;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		    -webkit-filter: blur(0);
    filter: blur(0);
	}
	.play .content .skin {
		position: absolute;
        display: flex;
        flex-direction: column;
        bottom: 50px;
        right: 15px;
        width: 30px;
	}
	.play .content .skin .skin-colors {
		 flex: 4;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
	}
	.play .content .skin .skin-colors .selected {
		border: 1px solid #fff;
	}
	.play .content .skin .skin-colors i {
		flex: 1;
            display: inline-block;
            width: 20px;
            height: 20px;
            cursor: pointer;
            border-radius: 10px;
            margin-bottom: 5px;
	}
	.play .content .skin .skin-colors i.one {
            background-color: #B72712;
          }
    .play .content .skin .skin-colors i.two {
            background-color: #1565C0;
          }
    .play .content .skin .skin-colors i.three {
            background-color: #212121;
          }
    .play .content .skin .skin-colors i.four {
            background-color: #1B5E20;
          }
	.play .content .skin .icon-skin {
		flex: 1;
          width: 100%;
          height: 30px;
          background-repeat: no-repeat;
          background-size: contain;
          margin-top: 3px;
          cursor: pointer;
	}
	.play .content .skin .icon-skin-red {
          background-image: url('./skinRed.svg');
        }
     .play .content .skin .icon-skin-green {
          background-image: url('./skinGreen.svg');
        }
     .play .content .skin .icon-skin-blue {
          background-image: url('./skinBlue.svg');
        }
    .play .content .skin .icon-skin-black {
          background-image: url('./skinBlack.svg');
        }
	.play .content .progress {
		position: absolute;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		bottom: .4rem;
		text-align: center;
		color: rgba(255,255,255,.8);
	}
	.play .content .progress .start-time {
		flex: 1;
	}
	.play .content .progress .progress-bar {
		position: relative;
		width: 100%;
		height: 5px;
		background-color: rgba(255,255,255,.8);
		vertical-align: middle;
		border-radius: 3px;
		flex: 4;
	}
	.play .content .progress .progress-bar .now {
		position: absolute;
		left: 0;
		display: inline-block;
		height: 100%;
		background-color: red;
	}
	.play .content .progress .progress-bar .now::after {
		content: "";
		position: absolute;
		left: 100%;
		top: -1px;
		height: 160%;
		width: 5px;
		border-radius: 50%;
		background-color: #555;
	}
	.play .content .progress .end-time {
		flex: 1;
	}
	.play .footer {
		flex: 1;
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 1;
		height: 2.3rem;
		background-color: #b72712;
		width: 100%;
	}
	.play .footer .prev {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.play .footer .prev .icon-prev i {
		display: inline-block;
		background: url('./prev.png') no-repeat;
		background-size: contain;
		width: 1.6rem;
		height: 1.6rem;
		vertical-align: bottom;
	}
	.play .footer .play {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.play .footer .play .icon-play i {
		display: inline-block;
		background-repeat: no-repeat;
		background-size: contain;
		width: 2rem;
		height: 2rem;
		vertical-align: middle;
	}
	.play .footer .play .play-icon {
		background: url(./play.png) no-repeat;
		background-size: contain;
	}
	.play .footer .play .pause-icon {
		display: inline-block;
		background: url('./pause.png') no-repeat;
		background-size: contain;
	}
	.play .next {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.play .next .icon-next i {
		display: inline-block;
		background: url('./next.png') no-repeat;
		background-size: contain;
		width: 1.6rem;
		height: 1.6rem;
		vertical-align: bottom;
	}
</style>