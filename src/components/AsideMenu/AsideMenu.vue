<template>
	<transition name="fadeIn">
		<div class="aside-menu">
			<i @click="showAsideMenu()" class="back"></i>
			<div class="aside">
				<div :style="{backgroundColor: skinColor}" class="info">
				  <a href="https://microzz.com/" target="_blank" class="avatar"><img src="http://microzz.com/img/avatar.jpg" alt=""></a>
				  <div class="about">
				  	<span class="name"><a href="https://microzz.com/">AquariusBaby</a></span>
				  	<span class="level">Lv100</span>
				  	<span class="sign">
				  		<i></i>
				  		签到
				  	</span>
				  </div>
				</div>

				<div class="setting">
					<div class="content">
						<ul>
							<li><i class="icon-msg"></i>我的消息</li>
							<li><i class="icon-vip"></i>会员中心</li>
							<li><i class="icon-shop"></i>商城</li>
							<li><i class="icon-music"></i>在线听歌免流量</li>
						</ul>
						<ul>
							<li><i class="icon-friend"></i>我的好友</li>
							<li><i class="icon-near"></i>附近的人</li>
						</ul>
						<ul>
							<li @click.stop.prevent="changeSkin()"><i class="icon-skin"></i>个性换肤</li>
							<li @click="showAbout()"><i class="aboutme"></i>关于</li>
						</ul>
						<div class="back">
							<i @click.stop.prevent="showAsideMenu()" class="icon-back"></i>
						</div>
					</div>

				</div>
			</div>

			<div @click.stop.prevent="showAsideMenu()" class="mask"></div>

		</div>
	</transition>
</template>
<script>
import { mapGetters } from 'vuex'
	export default {
		data() {
			return {

			}
		},
		methods: {
			showAsideMenu() {
				this.$store.dispatch('showAsideMenu',false);
			},
			changeSkin() {
				//this.$store.dispatch('changeSkin',)
			},
			showAbout() {
				this.$store.dispatch('showAbout',true);
			}
		},
		computed: mapGetters([
			'skinColor'
		])
	}
</script>
<style scoped>
	.fadeIn-enter-active {
		transition: all .4s ease;
	}
	.fadeIn-leave-active {
		transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.fadeIn-enter, .fadeIn-leave-active {
		transform: translateX(-250px);
		opacity: 0;
	}
	.aside-menu {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		display: flex;
		z-index: 101;
	}
	.aside-menu i.back {
		display: inline-block;
		position: absolute;
		left: 50%;
		top: 10px;
		background: url('back.svg') no-repeat;
		width: 20px;
		height: 20px;
		background-size: contain;
	}
	.aside-menu .aside {
		flex: 6;
	}
	.aside-menu .mask {
		flex: 4;
		background-color: #000;
		opacity: 0.6;
	}
	.aside-menu .info {
		padding-top: 20px;
      padding-left: 10px;
      padding-bottom: 8px;
      background-color: #B72712;
      box-shadow: 2px 0 10px gray;
      flex: 1;
      box-sizing: border-box;
      height: 25%;
	}
	.aside-menu .info img {
		width: 100px;
        height: 95px;
        border-radius: 60px;
	}
	.aside-menu .info .about {
		position: relative;
        margin-top: 2px;
	}
	.aside-menu .info .about span.name {
		color: rgba(255, 255, 255, .8);
        font-size: .8rem;
	}
	.aside-menu .info .about span.level {
		width: 15px;
          height: 15px;
          border: 1px solid white;
          border-radius: 20px;
          padding: 0 6px;
          color: white;
          font-size: .2rem;
          font-style: italic;
          vertical-align: middle;
          line-height: 22px;
	}
	.aside-menu .info .about span.sign {
		position: absolute;
          right: 10px;
          top: 0;
          border: 1px solid white;
          height: 20px;
          width: 50px;
          border-radius: 10px;
          line-height: 20px;
          text-align: center;
          color: white;
          font-size: .7rem;
          cursor: pointer;
	}
	.aside-menu .setting {
		flex: 4.2;
      position: relative;
      height: 75%;
      background-color: white;
      border-right: 1px solid gray;
      box-shadow: 2px 0 20px gray;
	}
	.aside-menu .setting .content {
		height: 85%;
	}
	.aside-menu .setting ul:nth-of-type(1) {
		 color: rgba(0, 0, 0, .5);
        padding-top: 20px;
        border-bottom: 6px solid rgba(0, 0, 0, .04);
	}
	.aside-menu .setting ul:nth-of-type(2) {
		color: rgba(0, 0, 0, .5);
        padding-top: 10px;
        padding-bottom: 5px;
        border-bottom: 6px solid rgba(0, 0, 0, .04);
	}
	.aside-menu .setting ul:nth-of-type(3) {
		padding-top: 15px;
	}
	.aside-menu .setting ul {
		list-style: none;
        padding: 5px 15px;
	}
	.aside-menu .setting ul li {
		font-size: .78rem;
        margin-bottom: 20px;
        cursor: pointer;
	}
	.aside-menu .setting ul li i {
		display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 4px;
        vertical-align: text-bottom;
	}
	.aside-menu .setting ul li i.icon-skin {
		background: url('./skin.svg') no-repeat;
        background-size: contain;
	}
	.aside-menu .setting ul li i.icon-msg {
		background: url('./msg.svg') no-repeat;
            background-size: contain;
	}
	.aside-menu .setting ul li i.icon-vip {
		background: url('./vip.svg') no-repeat;
            background-size: contain;
	}
	.aside-menu .settings ul li i.icon-shop {
		 background: url('./shop.svg') no-repeat;
            background-size: contain;
	}
	.aside-menu .settings ul li i.icon-music {
		background: url('./music.svg') no-repeat;
            background-size: contain;
	}
	.aside-menu .settings ul li i.icon-friend {
		background: url('./friend.svg') no-repeat;
            background-size: contain;
	}
	.aside-menu .setting ul li i.icon-near {
		background: url('./near.svg') no-repeat;
            background-size: contain;
	}
	.aside-menu .setting ul li i.aboutme {
		display: inline-block;
            margin-right: 2px;
            width: 20px;
            height: 20px;
            background: url('./about.svg') no-repeat;
            background-size: contain;
	}
	 a.avatar:hover::after {
    transform: scaleX(0);
  }
  a::after {
    background-color: white;
  }
</style>