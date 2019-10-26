<template>
    <div>
        <div id="chart-panel">
            <canvas id="canvas">
                你的浏览器不支持canvas，请升级浏览器
            </canvas>
        </div>
        <!--        <div style="margin-top:10px">-->
        <!--            <button v-on:click="s.changeDir('left')">↑</button>-->
        <!--            <button v-on:click="s.changeDir('right')">←</button>-->
        <!--            <button v-on:click="s.changeDir('up')">→</button>-->
        <!--            <button v-on:click="s.changeDir('down')">↓</button>-->
        <!--        </div>-->
        <!--        <button @click="handleClick">操作</button>-->
    </div>
</template>

<script>
    import drawMixin from './draw/draw.js'
    import {eventBus} from '@/eventBus.js'
    import Bus from '@/components/Bus'

    export default {
        name: "my-canvas",
        mixins: [drawMixin],
        data() {
            return {
                data: [
                    {value: "0.32", title: "体育课", color: "blue"},
                    {value: "0.32", title: "语文课", color: "green"},
                    {value: "0.12", title: "数学课", color: "black"},
                    {value: "0.22", title: "英文课", color: "purple"},
                    {value: "0.02", title: "政治课", color: "yellow"}
                ],
                imageUrl: require('@/assets/images/boys.png'),
                waterUrl: require('@/assets/images/watermark.png'),
                dirIndex: 0,
                axis: {
                    yAxis: [0, 10, 20, 30, 40, 50, 60],
                    xAxis: ["2017-10-24", "2017-10-25", "2017-10-26", "2017-10-27"],
                    data: [
                        [20, 30, 10, 35],//四个参数分别是矩形的最小值，最大值，和线段的最小值和最大值
                        [35, 38, 30, 55],
                        [33, 38, 33, 40],
                        [40, 40, 32, 42]
                    ],
                    fillStyle:[],
                    strokeStyle:[],
                },
                s: null,//精灵
                l: null,//长方形
                lineItem: null
            }
        },
        computed: {
            bus() {
                return Bus
            }
        },
        methods: {
            handleMoveData(e) {
                //console.log(e.clientX,e.clientY)
                //输入：元素的坐标
                //输出：元素是否存在规定的区域内
                // let isInRect = Bus.isInRect(e.clientX)
                // console.log(isInRect)
            },
            handleClick() {
                Bus.$data.name = "lisi"
            }
        },
        mounted() {
            //this.konvaDemo()
            this.productPop()
            //this.drawChess()
            //console.log(Bus.$data)
        },
        beforeDestroy() {
            //移除事件的绑定
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

