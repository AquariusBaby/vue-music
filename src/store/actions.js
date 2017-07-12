import axios from 'axios'
export default {
	getData: ({commit}) => {
		axios.get('http://120.26.57.9:8080/vue-music/json/api.json')
		.then(
			function(res){
				//state.musics=res.data;
				commit('getData',{list:res.data});
			},
			function(err){
				console.log(err.type,11);
			})
		.catch(
			function(error){
			console.log(error);
		});
	},
	showMiniMusic: ({commit},flag) => {
		commit('showMiniMusic',flag);
		//console.log(flag);
	},
	play: ({commit},flag) => {
		commit('play',flag);
		console.log(flag);
	},
	toggleMusic: ({commit},index) => {
		commit('toggleMusic',index);
	},
	showIndex: ({commit},flag) => {
		commit('showIndex',flag);
	},
	playMusic: ({commit},playload) => {
		commit('playMusic',playload);
	},
	addMusic: ({commit},playload) => {
		commit('addMusic',playload);
	},
	getSongList: ({commit},obj) => {
		commit('getSongList',obj);
	},
	rankName: ({commit},str) => {
		commit('rankName',str);
	},
	showAsideMenu: ({commit},flag) => {
		commit('showAsideMenu',flag);
	},
	showDetail: ({commit},flag) => {
		commit('showDetail',flag);
	},
	showRank: ({commit},flag) => {
		commit('showRank',flag);
	},
	findDOM: ({commit},playload) => {
		commit('findDOM',playload);
	}

}
