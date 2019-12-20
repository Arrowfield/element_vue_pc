<template>
	<div class="canvas-parent">
		<canvas id="action" :width="width" :height="height">你的浏览器版本过低，暂不支持canvas，请升级浏览器</canvas>
		<canvas id="static" :width="width" :height="height">你的浏览器版本过低，暂不支持canvas，请升级浏览器</canvas>
	</div>
</template>

<script>
    import { mapState } from 'vuex'
		import { IMAGE_URL_BG } from '@/store/modules/dashboard/constants'
		import { makeActinian } from '@/store/modules/dashboard/utils/draw'
    export default {
        data() {
            return {
                deltaTime:0,
                lastTime:0,
                ctx:null,
								action:null
						}
        },
        mounted() {
						this.drawStatic(this.$el.children[0],this.$el.children[1])
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
            drawStatic(act,sta){
                let image = new Image()
                this.act = act.getContext('2d')
								this.sta = sta.getContext('2d')
								image.src = require('../../assets/img/background.jpg')
								image.onload = ()=>{ this.sta.drawImage(image,0,0,800,600)}
								this.draw()

						},
            draw(){
                requestAnimationFrame(this.draw)
								let now = new Date()
								this.deltaTime = now - this.lastTime
								this.lastTime = now
                makeActinian(this.act,this.deltaTime)
                //this.act.clearRect(0, 0, this.width, this.height)
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
				//background: transparent;
			}
		}
	}
</style>