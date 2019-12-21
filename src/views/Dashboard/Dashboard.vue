<template>
	<div class="canvas-parent">
		<canvas id="static" :width="width" :height="height">你的浏览器版本过低，暂不支持canvas，请升级浏览器</canvas>
		<canvas id="action" :width="width" :height="height">你的浏览器版本过低，暂不支持canvas，请升级浏览器</canvas>
	</div>
</template>

<script>
    import { mapState } from 'vuex'
		import { IMAGE_URL_BG } from '@/store/modules/dashboard/constants'
		import { canvasInit,canvasLoop } from '@/store/modules/dashboard/utils/draw'
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
						this.init(this.$el.children[1],this.$el.children[0])
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
            init(act,sta){
                this.act = act.getContext('2d')
								this.sta = sta.getContext('2d')
                canvasInit(this.act,this.sta)
                canvasLoop(this.act,this.sta)
						},
            draw(){
                requestAnimationFrame(this.draw)
                this.sta.clearRect(0, 0, this.width, this.height)
								let now = new Date()
								this.deltaTime = now - this.lastTime
								this.lastTime = now
                //makeActinian(this.sta,this.deltaTime)

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
			&:nth-child(2){
				//background: red;
			}
		}
	}
</style>