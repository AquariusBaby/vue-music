<template>
	<div>
		<div class="loading-wrapper">
			<div class="loading"></div>
			<div class="loading-text">正在加载...</div>
		</div>
		<div class="container">
			<div id="slider">
				<swiper :options="swiperOption">
					<swiper-slide><img class="banner-item" src="/static/banner2.jpg" alt=""></swiper-slide>
					<swiper-slide><img class="banner-item" src="/static/banner2.jpg" alt=""></swiper-slide>
					<swiper-slide><img class="banner-item" src="/static/banner3.jpg" alt=""></swiper-slide>
					<swiper-slide><img class="banner-item" src="/static/banner4.jpg" alt=""></swiper-slide>
				</swiper>
				<div class="swiper-pagination" slot="pagination"></div>
			</div>
		</div>
	</div>
</template>
<script>
	import { swiper , swiperSlide } from 'vue-awesome-swiper'

	export default {
		data () {
			return {
				swiperOption: {
					pagination: '.swiper-pagination',
					paginationClickable: true
				},
				isloading: true,
		        playList: [],
		        mvList: []
			}
		},
		components: {
			swiper,
			swiperSlide
		}
	}
</script>
<style lang="less" scoped>
	
</style>