import LineItem from "./line.js";

export default {
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
                originY = 470,
                axisX = this.axis.xAxis,
                axisY = this.axis.yAxis,
                font = 12;
            ctx.lineWidth = 1
            //绘制竖线
            ctx.moveTo(originX + .5, originY)
            ctx.lineTo(originX + .5, originY - this.axis.yAxis.length * baseY)
            //绘制横线
            ctx.moveTo(originX, originY + .5)
            ctx.lineTo(originX + this.axis.xAxis.length * baseX, originY + .5)

            ctx.font = `${font}px sans-serif`
            ctx.textAlign = "center" //水平方向
            ctx.textBaseline = "bottom"

            for (let i = 0; i <= axisX.length; i++) {
                ctx.moveTo(originX + i * baseX + .5, originY)
                ctx.lineTo(originX + i * baseX + .5, originY + pointWidth)
                if (i <= axisX.length - 1) {
                    ctx.fillText(axisX[i], originX + i * baseX + baseX / 2, originY + pointWidth + font + 5)
                    // var item = new LineItem(this.axis.data[i])
                    // item.draw()
                }
                
            }
            ctx.stroke()
            ctx.beginPath()
            ctx.textBaseline = "middle" //垂直方向
            for (let i = 0; i <= axisY.length; i++) {
                ctx.moveTo(originX, originY - i * baseY + .5)
                ctx.lineTo(originX - pointWidth, originY - i * baseY + .5)
                if (i <= axisY.length - 1) {
                    ctx.fillText(axisY[i], originX - (pointWidth + font + 5), originY - i * baseY + .5)
                }
            }
            ctx.strokeStyle = "black"
            ctx.stroke()

            ctx.beginPath()
            ctx.strokeStyle = "#ccc"
            for (let i = 1; i <= axisY.length; i++) {
                ctx.moveTo(originX, originY - i * baseY + .5)
                ctx.lineTo(originX + this.axis.xAxis.length * baseX, originY - i * baseY + .5)
            }
            ctx.stroke()

        }
    }
}