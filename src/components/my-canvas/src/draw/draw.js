
import Sprite from './Sprite.js'
export default {
    methods: {
        productPop() {
            let canvas = document.getElementById('canvas')
            let ctx = canvas.getContext('2d')

            this.s = new Sprite({
                x:300,
                y:300,
                w:80,
                h:65 * 2,
                fps:10,
                originX:40,
                originY:65,
                imgSrc:this.imageUrl,
            })
            this.s.render(ctx)
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
                options = this.axis.data,
                font = 12,
                average = baseY / 10,
                strokeColor = "black";
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
                }
                /*
                if(i < axisX.length){
                    //console.log(originY - options[i-1][3],originY - options[i-1][4])
                    ctx.moveTo(originX + baseX / 2 + baseX * i + .5,originY - options[i][2] * average)
                    ctx.lineTo(originX + baseX / 2 + baseX * i + .5,originY - options[i][3] * average)
                    //绘制坐标显示的矩形
                    //(x,y,width,height) options[i][0] options[i][1]
                    //起始点将它移到最高点
                    
                    var rectX = originX + baseX / 2 +  baseX * i - 50 + .5
                    var rectY = originY - options[i][1] * 5 
                    var rectWidth = 100
                    var rectHeight = (options[i][1] - options[i][0]) * average 
                    if(rectHeight == 0){
                        rectHeight = 1.5
                    }
                    //ctx.fillStyle = "#C23531"
                    ctx.fillRect(rectX,rectY,rectWidth,rectHeight)
                }*/
            }

            //ctx.strokeStyle = strokeColor


            //ctx.strokeStyle = "black"
            //ctx.fillStyle = "black"
            ctx.textBaseline = "middle" //垂直方向
            for (let i = 0; i <= axisY.length; i++) {
                ctx.moveTo(originX, originY - i * baseY + .5)
                ctx.lineTo(originX - pointWidth, originY - i * baseY + .5)
                if (i <= axisY.length - 1) {
                    ctx.fillText(axisY[i], originX - (pointWidth + font + 5), originY - i * baseY + .5)
                }
            }


            ctx.stroke()

            ctx.beginPath()
            ctx.strokeStyle = "#ccc"
            for (let i = 1; i <= axisY.length; i++) {
                ctx.moveTo(originX, originY - i * baseY + .5)
                ctx.lineTo(originX + this.axis.xAxis.length * baseX, originY - i * baseY + .5)
            }
            ctx.stroke()

            ctx.beginPath()
            //ctx.fillStyle = "#C23531"
            //ctx.strokeStyle = "#C23531"

            //314656
            for (let i = 0; i <= axisX.length; i++) {

                if (i < axisX.length) {
                    //console.log(originY - options[i-1][3],originY - options[i-1][4])
                    ctx.moveTo(originX + baseX / 2 + baseX * i + .5, originY - options[i][2] * average)
                    ctx.lineTo(originX + baseX / 2 + baseX * i + .5, originY - options[i][3] * average)
                    //绘制坐标显示的矩形
                    //(x,y,width,height) options[i][0] options[i][1]
                    //起始点将它移到最高点
                    if (i == 2) {
                        //ctx.fillStyle = "#314656"
                        //ctx.strokeStyle = "#314656"
                    } else {
                        ctx.fillStyle = "#C23531"
                        ctx.strokeStyle = "#C23531"
                    }

                    var rectX = originX + baseX / 2 + baseX * i - 50 + .5
                    var rectY = originY - options[i][1] * 5
                    var rectWidth = 100
                    var rectHeight = (options[i][1] - options[i][0]) * average
                    if (rectHeight == 0) {
                        rectHeight = 1.5
                    }
                    //ctx.fillStyle = "#C23531"
                    ctx.fillRect(rectX, rectY, rectWidth, rectHeight)
                }

                ctx.stroke()
            }

        }
    }
}