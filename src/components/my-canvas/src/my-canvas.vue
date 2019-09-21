<template>
    <div>
        <canvas id="canvas" width="800" height="510" style="border:1px solid #ddd">
            你的浏览器不支持canvas，请升级浏览器
        </canvas>
        <div>
            <button v-on:click="dirIndex = 0">↑</button>
            <button v-on:click="dirIndex = 1">←</button>
            <button v-on:click="dirIndex = 2">→</button>
            <button v-on:click="dirIndex = 3">↓</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my-canvas",
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
                    xAxis:[2017-10-24,2017-10-25,2017-10-26,2017-10-27]
                }
            }
        },
        methods: {
            productPop() {
                let canvas = document.getElementById('canvas')
                let ctx = canvas.getContext('2d')
                //let image = new Image()
                //image.src = this.imageUrl
                /*image.onload = () => {
                    //ctx.drawImage(image,40,65,40,65,300,300,40,65)
                    let frameIndex = 0
                    setInterval(() => {
                        ctx.clearRect(0, 0, canvas.width, canvas.height)
                        ctx.drawImage(
                            image,
                            frameIndex * 40,
                            this.dirIndex * 65,
                            40,
                            65,
                            200,
                            200,
                            80,
                            130
                        )
                        frameIndex++
                        frameIndex %= 4
                    }, 1000 / 10)
                }*/
                var 
                baseX = 160,
                baseY = 50,
                pointWidth = 8,
                originX = 40,
                originY = 470;
                ctx.lineWidth = 2
                ctx.moveTo(originX,originY)
                ctx.lineTo(originX,originY - this.axis.yAxis.length * baseY)
                ctx.moveTo(originX,originY)
                ctx.lineTo(originX + this.axis.xAxis.length * baseX,originY)
                ctx.strokeStyle = "black"
                ctx.stroke()

            }
        },
        mounted() {
            this.productPop()
        }
    }
</script>

<style scoped>
    #canvas{
        background: #F3F3F3;
    }
</style>