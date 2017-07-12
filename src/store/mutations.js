const state = {
	musicData: [],					//存放播放列表
	skinColor: localStorage.skinColor || '#B72712', //皮肤颜色
	isShowIndex: true,				//显示具体播放详情
	isShowDetail: false,			//显示具体歌单列表
	isShowRank: false,
	isPlaying: false,
	isAnimation: false,
	isShowAsideMenu: false,			//显示侧栏
	isShowMiniMusic: true,			//显示底部播放器
	isShowAbout: false,
	linkBorderIndex: '',
	rankName: '',					//排行歌单名
	DOM: {},
	songList:[],
	audio: {
		name: '',
		src: '',
		musicImgSrc: '',
		index: 0
	}
}

import getters from './getters.js'

const mutations = {
	del(state, index) {
      if (state.musicData.length === 0) {
        return;
      }
      state.musicData.splice(index, 1);
    },
	getData(state,{list}){
		//console.log(list);
		state.musicData=list;
	},
	showMiniMusic(state,flag){
		//console.log(flag);
		state.isShowMiniMusic=flag;
	},
	play(state,flag){
		console.log(flag);
		state.isPlaying = flag;
	},
	toggleMusic(state,index) {
		state.audio.name = state.musicData[index].name;
		state.audio.src = state.musicData[index].src;
		state.audio.musicImgSrc = state.musicData[index].musicImgSrc;
		state.audio.index = index;
	},
	showIndex(state,flag) {
		state.isShowIndex = flag;
	},
	playMusic(state,playload) {
		state.audio.name = playload.name;
		state.audio.src = playload.src;
		state.audio.musicImgSrc = playload.musicImgSrc;
		state.isPlaying = true;
	},
	addMusic(state,playload) {
		for(let i=0;i<state.musicData.length;i++){
			if(state.musicData[i].name==playload.name){
				let a = state.musicData[0];
				state.musicData[0]=state.musicData[i];
				state.musicData[i]=a;
				return ;
			}
		}
		state.musicData.unshift(playload);
	},
	getSongList(state,obj) {
		state.songList=obj;
	},
	rankName(state,str) {
		state.rankName=str;
	},
	showAsideMenu(state,flag) {
		state.isShowAsideMenu=flag;
	},
	showDetail(state,flag) {
		state.isShowDetail=flag;
	},
	showRank(state,flag) {
		state.isShowRank=flag;
	},
	findDOM(state,playload) {
		state.DOM[playload.name] = playload.dom;
	}
}

export default {
	state,
	mutations,
	getters
}