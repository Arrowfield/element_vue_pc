<template>
    <div>
        <div id="chart-panel">
            <canvas id="canvas">你的浏览器不支持canvas，请升级浏览器</canvas>
        </div>
    </div>
</template>

<script>
    import drawMixin from './draw/draw.js'
    import Bus from '@/components/Bus'

    export default {
        name: "my-canvas",
        mixins: [drawMixin],
        data() {
            return {
                axis: {
                    yAxis: [0, 10, 20, 30, 40, 50, 60],
                    xAxis: ["2017-10-24", "2017-10-25", "2017-10-26", "2017-10-27"],
                    data: [
                        [20, 30, 10, 35],
                        [35, 38, 30, 55],
                        [33, 38, 33, 40],
                        [40, 40, 32, 42]
                    ],
                    fillStyle:[],
                    strokeStyle:[],
                },
            }
        },
        mounted() {
            Bus.$set(Bus.$data.axis,'axis',this.axis)
            this.productPop()
        }
    }
    //svg可以直接绑定事件 canvas则不行 canvas有默认的宽高
</script>

<style scoped>
    #canvas {
        background: #F3F3F3;
        display: block;
        margin: 40px auto 40px;
        box-shadow: 10px 10px 15px #ddd;
    }
</style>

