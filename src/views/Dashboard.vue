<template>
	<div class="canvas-parent">
		<canvas id="static" :width="width" :height="height">你的浏览器版本过低，暂不支持canvas，请升级浏览器</canvas>
		<canvas id="action" :width="width" :height="height" @mousemove="leapCanvas">你的浏览器版本过低，暂不支持canvas，请升级浏览器</canvas>
	</div>
</template>

<script>
  import {mapState} from 'vuex'
  import {IMAGE_URL_BG} from '@/store/modules/dashboard/constants'
  import {canvasInit, canvasLoop, getArea} from '@/store/modules/dashboard/utils/draw'

  export default {
    data() {
      return {
        deltaTime: 0,
				lastTime: 0,
        ctx: null,
        action: null,
        mx: 0,
        my: 0
      }
    },
    mounted() {
      this.init(this.$el.children[1], this.$el.children[0])
    },
    name: "Dashboard",
    computed: {
      ...mapState({
        width: state => state.dashboard.canvasConfig.width,
        height: state => state.dashboard.canvasConfig.height
      })
    },
    watch: {},
    methods: {
      init(act, sta) {
        this.act = act.getContext('2d')
        this.sta = sta.getContext('2d')
        canvasInit(this.act, this.sta)
        canvasLoop(this.act, this.sta, 0, 0)
      },
      draw() {
        requestAnimationFrame(this.draw)
        this.sta.clearRect(0, 0, this.width, this.height)
        let now = new Date()
        this.deltaTime = now - this.lastTime
        this.lastTime = now
      },
      leapCanvas(e) {
        if (e.offsetX || e.layerX) {
          this.mx = e.offsetX === undefined ? e.layerX : e.offsetX;
        }
        if (e.offsetY || e.layerY) {
          this.my = e.offsetY === undefined ? e.layerY : e.offsetY;
        }
        //canvasLoop(this.act, this.sta, this.mx, this.my)
        //console.log(this.mx,this.my)
        getArea(this.mx, this.my)
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

			&:nth-child(2) {
				//background: red;
			}
		}
	}
</style>