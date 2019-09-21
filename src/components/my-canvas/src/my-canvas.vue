<template>
    <div>
        <canvas id="canvas" width="600" height="500" style="border:1px solid #ddd">
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
                dirIndex:0
            }
        },
        methods: {
            productPop() {
                let canvas = document.getElementById('canvas')
                let ctx = canvas.getContext('2d')
                let image = new Image()
                image.src = this.imageUrl
                image.onload = () => {

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
                }

            }
        },
        mounted() {
            this.productPop()
        }
    }
</script>

<style scoped>

</style>