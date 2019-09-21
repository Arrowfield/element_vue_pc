<template>
    <div>
        <div @mousemove="handleMoveData" id="chart-panel">
            <canvas id="canvas" width="800" height="510" style="border:1px solid #ddd">
                你的浏览器不支持canvas，请升级浏览器
            </canvas>
        </div>
        <div>
            <button v-on:click="dirIndex = 0">↑</button>
            <button v-on:click="dirIndex = 1">←</button>
            <button v-on:click="dirIndex = 2">→</button>
            <button v-on:click="dirIndex = 3">↓</button>
        </div>
    </div>
</template>

<script>
    import drawMixin from './draw/draw.js'
    import { eventBus } from '@/eventBus.js'
    export default {
        name: "my-canvas",
        mixins:[drawMixin],
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
                dirIndex:0,
                axis:{
                    yAxis:[0,10,20,30,40,50,60],
                    xAxis:["2017-10-24","2017-10-25","2017-10-26","2017-10-27"],
                    data:[
                        [20,30,10,35],
                        [40,35,30,55],
                        [33,38,33,40],
                        [40,40,32,42]
                    ]
                }
            }
        },
        methods: {
            handleMoveData(e){
                //console.log(e.clientX,e.clientY)
            }
        },
        mounted() {
            var dom = document.getElementById("chart-panel")
            var canvas = document.getElementById("canvas")
            dom.style.width = canvas.offsetWidth + "px"
            dom.style.height = canvas.offsetHeight + "px"
            window.addEventListener('resize',function(e){
                console.log(e)
            })
            this.productPop()
        }
    }
    //svg可以直接绑定事件 canvas则不行
</script>

<style scoped>
    #canvas{
        background: #F3F3F3;
    }
</style>

