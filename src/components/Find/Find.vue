<template>
	<transition name="showRouter">
		<div class="find">
			<div class="search-input">

				<div class="input">
					<i class="icon-search"></i>
					<input v-model="keywords" @keyup.enter="toSearch(keywords)" @focus="inputFocus()" :class="{'input-focus': !isShowHot}" type="text" placeholder="搜索歌名/歌手">
					<!-- <i @click="keywords=''" v-show="keywords!==''&&!isShowHot" class="icon-cancel"></i> -->
					<div v-show="!isShowHot"  @click="isShowHot=true,keywords=''" class="cancel-btn">取消</div>
				</div>

			</div>

			<!-- 热门搜索 -->
			<div v-if="isShowHot" class="hot">
				热门搜索
				<div class="keywords">
					<div v-for="item of hotKeywords" @click="toSearch(item)" class="keyword">{{item}}</div>
				</div>
			</div>

			<div v-else class="search-list">
				<!-- 搜索历史 -->
				<div v-show="isSHowHistory" v-for="(item, index) of searchHistory" class="history">
					<div class="icon"><i class="icon-history"></i></div>
					<div @click="toSearch(item)" class="word">{{item}}</div>
					<div class="icon"><i @click="searchHistory.splice(index, 1)" class="icon-del"></i></div>
				</div>

				<div v-show="isShowHot&&searchHistory.length" @click="searchHistory=[]" class="tips">清除搜索记录</div>

				<div v-show="isLoading" class="loading"><i class="icon-loading"></i>搜索中...</div>
				<div @click="playMusic(index,item.songname,item.albumpic_small,item.m4a)" v-for="(item ,index) of musicList" class="music">
					<div class="icon-music">
						<img :src="item.albumpic_small" alt="">
					</div>
					<div class="music-info">
						<div class="music-name">{{item.songname}}</div>
						<div class="music-singer">{{item.singername}}</div>
						<i class="icon-listening"></i>
					</div>
				</div>
				<div class="tips" @click="searchHistory=[]" v-show="!searchHistory">~清除所有搜索记录~</div>
			</div>

		</div>
	</transition>
</template>
<script>
import { mapGetters } from 'vuex'
	export default {
		name: 'find',
		created() {
			/*this.axios.get()				//获取热门搜索词
				.then(res => {
					this.hotKeywords = res.
				})*/
		},
		computed: mapGetters([
			'musicData'
		]),
		data() {
			return {
				keywords: '',								//关键词
				isShowHot: true,							//显示热门搜索界面
				isLoading: false,							//加载中
				isSHowHistory: false,						//显示历史记录
				hotKeywords: ['薛之谦','胡歌','霍建华'],	//热门搜索词
				searchHistory: ['韩寒','郭敬明','亮亮'],	//搜索历史，存localStorage
				musicList: ''								//搜索得到的歌单
			}
		},
		/*watch: {
			musicData: {
			  handler(val, oldVal) {
			    localStorage.musics = JSON.stringify(val);
			  },
			  deep: true
			},
			searchHistory: {
			  handler(val) {
			    localStorage.searchHistory = JSON.stringify(val);
			  },
			  deep: true
			}
		}*/
		methods: {
			toSearch(keywords) {
				if(keywords.trim()){	//还得作判断，去除两边空格
					var _this=this;
					_this.isSHowHistory=false;
					_this.isShowHot=false;
					_this.isLoading=true;
					_this.$store.dispatch('showMiniMusic',false);
					_this.keywords=keywords;
					this.axios.get('http://120.26.57.9:8080/vue-music/SearchMusic?keyword='+keywords+'&page=1').then(function(res){
						//console.log(res.data.showapi_res_body.pagebean.contentlist); //30条数据
						_this.musicList=res.data.showapi_res_body.pagebean.contentlist;
						//console.log(_this.musicList);
						_this.searchHistory.unshift(keywords);
						_this.isLoading=false;
					}).catch(function(error){
						console.log(error);
					});
				}
					/*url: '120.26.57.9/vue-music/SearchMusic?keyword=王菲&page=1',*/
					/*url: '120.26.57.9/vue-music/TopMusic?topid=5'*/	
			},
			inputFocus() {			//输入框获取焦点后触发
				if(this.keywords.trim()){
					return ;
				}else {
					this.isShowHot = false;
					this.isSHowHistory = true;
					this.musicList = [];
				}
			},
			playMusic(index, name, imgSrc, src) {			//得到搜索结果，点击播放音乐
				this.$store.dispatch('playMusic',{name: name,musicImgSrc: imgSrc,src: src});
				this.$store.dispatch('showMiniMusic',true);
				this.$store.dispatch('addMusic',{name: name,musicImgSrc: imgSrc,src: src});
			}
		}
	}
</script>
<style scoped>
	.showRouter-enter-active {
		transition: all .3s ease;
	}
	.showRouter-leave-active {
		transition: all 0 ease;
	}
	.showRouter-enter, .showRouter-leave-active {
		transform: translateX(250px);
		opacity: 0;
	}
	.find {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		flex: 10;
		overflow: auto;
		margin: 3.5rem 0 2.5rem 0;
		min-height: 460px;
	}
	.find .search-input {
		position: relative;
		background-color: rgba(0,0,0,.1);
		text-align: center;
		border-bottom: 1px solid rgba(0,0,0,.1);
	}
	.find .search-input .input {
		position: relative;
		width: 90%;
		height: 35px;
		margin: 20px auto;
		text-align: left;
	}
	.find .search-input .input i.icon-search {
		position: absolute;
		top: 7px;
		left: 6px;
		display: inline-block;
		height: 20px;
		width: 20px;
		background: url('./find.svg') no-repeat;
		background-size: contain;
	}
	.find .search-input .input input {
		border-radius: 3px;
		border: none;
		padding: 0 34px;
		width: 80%;
		height: 100%;
		outline: none;
		color: #000;
	}
	.find .search-input .input i.icon-cancel {
		position: absolute;
		top: 7px;
		right: 1%;
		display: inline-block;
		height: 20px;
		width: 20px;
		background: url('./cancel.svg') no-repeat;
		background-size: contain;
	}
	.find .search-input .input .input-focus {
		width: 80%;
	}
	.find .search-input .input .cancel-btn {
		vertical-align: top;
		padding: 7px 15px;
		height: 100%;
		display: inline-block;
		position: absolute;
		right: 0;
		top: 0;
	}
	.find .hot {
		flex: 8;
		padding: 10px;
		font-size: 16px;
	}
	.find .hot .keywords {
		display: flex;
		flex-wrap: wrap;
		padding: 10px 0 0 16px;

	}
	.find .hot .keywords .keyword {
		border: 1px solid orange;
		padding: 6px;
		border-radius: 5px;
		margin-right: 13px;
	}
	.find .hot .keywords .div {
		text-align: center;
		width: 25%;
		padding: 5px;
		border: 1px solid gray;
		margin: 0 8% 10px 0;
		border-radius: 20px;
	}
	.find .hot .keywords .div:nth-of-type(1) {
		border-color: red;
		box-shadow: none;
		color: red;
	}

	.search-list {
		flex: 9;
		overflow: auto;
	}
	.search-list .history + .history {
		border-top: 1px solid rgba(0,0,0,.1);
	}
	.search-list .history {
		display: flex;
		width: 100%;
		height: 50px;
		justify-content: center;
		align-items: center;
	}
	.search-list .history .icon {
		flex: 1;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.search-list .history .icon-history {
		display: inline-block;
		width: 23px;
		height: 23px;
		background: url('./history.svg') no-repeat;
		background-size: contain;
	}
	.search-list .history .icon-del {
		display: inline-block;
		width: 20px;
		height: 20px;
		background: url('./del.svg') no-repeat;
		background-size: contain;
	}
	.search-list .history .word {
		flex: 5;
		width: 80%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.search-list .tips {
		text-align: center;
		margin: 12px auto;
		width: 200px;
		font-size: 80%;
		color: gray;
	}
	.search-list .loading {
		padding-top: 10px;
		text-align: center;
	}
	.search-list .loading .icon-loading {
		display: inline-block;
		margin: auto;
		width: 22px;
		height: 22px;
		background: url('./loading.svg') no-repeat;
		background-size: contain;
		animation: loading .6s linear infinite;
		vertical-align: text-top;
		margin-right: 10px;
	}
	.search-list .music + .music {
		border-top: 1px solid rgba(0,0,0,.1);
	}
	.search-list .music {
		display: flex;
		width: 100%;
		height: 60px;
	}
	.search-list .music .icon-music {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 60px;
		height: 60px;
	}
	.search-list .music .icon-music img {
		display: inline-block;
		width: 90%;
		height: 90%;
		background: url('./music.svg');
		background-size: contain;
	}
	.search-list .music .music-info {
		position: relative;
		flex: 1;
		padding: 8px 10px;
	}
	.search-list .music .music-info .music-name {
		width: 250px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
	}
	.search-list .music .music-info .music-singer {
	    padding-top: 3px;
	    font-size: 50%;
	    color: gray;
	}
	.search-list .music .music-info i {
        position: absolute;
        display: inline-block;
        width: 13px;
        height: 13px;
    }
    .search-list .music .music-info  i.icon-listening {
        background: url('./listening.svg') no-repeat;
        background-size: contain;
        right: 20px;
        top: 22px;
        animation: listening 1s linear infinite;
    }
	.search-list .music .music-info i.icon-love {
	    background: url('./love.svg') no-repeat;
	    background-size: contain;
	    right: 40px;
	    top: 20px;
	}
	@keyframes listening {
    0% {
      transform: scale(1);
    }
    33% {
      transform: scale(1.3);
    }
    66% {
      transform: scale(1);
    }
  }
</style>