<template>
  <div id="app">
    
    <!-- 主页界面部分  -->
    <transition name="show">
      <div v-show="isShowIndex" class="index">
        <!-- 侧栏边 -->
        <AsideMenu v-show="isShowAsideMenu"></AsideMenu>
        <!-- 头部 -->
        <VHeader></VHeader>

        <!-- 路由显示部 -->
        <router-view></router-view>

        <!-- 底部mini播放器 -->
        <VFooter></VFooter>
      </div>  
    </transition> 
    
    <!-- 播放界面 -->
    <transition name="showIndex">
      <Play v-show="isShowDetail"></Play>
    </transition>

    <!-- 排行榜歌单 -->
    <transition>
      <SongList v-show="isShowRank"></SongList>
    </transition>  
    
    <!-- 隐藏的audio标签 -->
    <audio :src="audio.src || (musicData[0]&&musicData[0].src) || defaultSrc" :autoplay="isPlaying" ref="audio"></audio>

    <!-- 关于界面 -->

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import VHeader from './components/Header/Header.vue'
import VFooter from './components/Footer/Footer.vue'
import Play from './components/Play/Play.vue'
import AsideMenu from './components/AsideMenu/AsideMenu.vue'
import SongList from './components/SongList/SongList.vue'
export default {
  name: 'app',
  components: {
    VHeader,VFooter,Play,AsideMenu,SongList
  },
  computed: mapGetters([
    'isShowIndex','audio','isShowAsideMenu','isPlaying','DOM','musicData','isShowDetail','isShowRank'
  ]),
  beforeCreate() {
    this.$store.dispatch('getData');
  },
  mounted() {
    this.$store.commit('findDOM', {name: 'audio', dom: this.$refs.audio});
    this.$refs.audio.addEventListener('ended', () => { this.next(); });
    this.$refs.audio.addEventListener('error', () => { this.next(); });
  },
  data() {
    return {
      defaultSrc: 'http://m2.music.126.net/K1SFXCvWf8BO9VEpSvx2ew==/7967061257205150.mp3'
    }
  },
  methods: {
    next() {
      console.log(this);
      this.audio.index = this.audio.index === this.musicData.length - 1 ? 0 : (++this.audio.index);
      this.$store.commit('toggleMusic', this.audio.index);
    }
  }

}
</script>
  
<style>
@import "./common/style/common.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 14px;
}
.showIndex-enter-active {
  transition: all .4s ease-out;
}
.showIndex-leave-active {
  transition: all 0 ease;
}
.showIndex-enter, .showIndex-leave-active {
  transform: translateY(350px);
  opacity: 0;
}
.show-enter-active {
  transition: all .4s ease;
}
.show-leave-active {
  transition: all 0 ease-out;
}
.show-enter, .show-leave-active {
  transform: translateX(-350px);
  opacity: 0;
}
</style>
