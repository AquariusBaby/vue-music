export default {
	musicData:(state) => {
		return state.musicData;
	},
	isShowMiniMusic:(state) => {
		return state.isShowMiniMusic;
	},
	skinColor:(state) => {
		return state.skinColor;
	},
	isPlaying:(state) => {
		return state.isPlaying;
	},
	audio:(state) => {
		return state.audio;
	},
	isShowMenu:(state) => {
		return state.isShowMenu;
	},
	isShowIndex:(state) => {
		return state.isShowIndex;
	},
	isShowDetail:(state) => {
		return state.isShowDetail;
	},
	isShowAsideMenu:(state) => {
		return state.isShowAsideMenu;
	},
	songList:(state) => {
		return state.songList.slice(0, 16);
	},
	rankName:(state) => {
		return state.rankName;
	},
	showDetail:(state) => {
		return state.isShowDetail;
	},
	isShowRank:(state) => {
		return state.isShowRank;
	},
	DOM:(state) => {
		return state.DOM;
	}
}