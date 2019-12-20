<template>
	<div class="canvas-parent">
		<canvas id="action" :width="width" :height="height">你的浏览器版本过低，暂不支持canvas，请升级浏览器</canvas>
		<canvas id="static" :width="width" :height="height">你的浏览器版本过低，暂不支持canvas，请升级浏览器</canvas>
	</div>
</template>

<script>
    import {mapState} from 'vuex'
		import {IMAGE_URL_BG} from '@/store/modules/dashboard/constants'
    export default {
        data() {
            return {
						}
        },
        mounted() {
						this.drawStatic(this.$el.children[1])
        },
        name: "Dashboard",
        computed: {
            ...mapState({
                width: state => state.dashboard.canvasConfig.width,
                height: state => state.dashboard.canvasConfig.height
            })
        },
        watch: {
        },
        methods: {
            drawStatic(el){
                let pen = el.getContext('2d'),image = new Image()
								image.src = require('../../assets/img/background.jpg')
								image.onload = ()=>{ pen.drawImage(image,0,0,800,600) }
						}
        },

    }
</script>

<style scoped lang="scss">
	.canvas-parent {
		position: relative;
		width: 800px;
		height: 600px;
		display: block;
		margin: 10px auto;
		canvas {
			position: absolute;
			top: 0;
			left: 0;
			&:nth-child(1){
				background: transparent;
			}
		}
	}
</style>