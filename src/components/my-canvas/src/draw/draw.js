
import Sprite from './Sprite.js'
import LineItem from "@/components/my-canvas/src/draw/LineItem";

export default {
    methods: {
        productPop() {
            let canvas = document.getElementById('canvas')
            let ctx = canvas.getContext('2d')
            // this.s = new Sprite({
            //     x:300,
            //     y:300,
            //     w:80,
            //     h:65 * 2,
            //     fps:10,
            //     originX:40,
            //     originY:65,
            //     imgSrc:this.imageUrl,
            // })
            // this.s.render(ctx)

            //this.l = new LineItem({x:0, y:0, w:300, h:100,fillStyle:"red"})
            //this.l.render(ctx)

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
            for (let i = 0; i <= axisX.length; i++) {
                ctx.moveTo(originX + i * baseX + .5, originY)
                ctx.lineTo(originX + i * baseX + .5, originY + pointWidth)
                if (i <= axisX.length - 1) {
                    ctx.fillText(axisX[i], originX + i * baseX + baseX / 2, originY + pointWidth + font + 5)
                }
            }
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

            this.lineItem = new LineItem({
                originX,
                originY,
                axisX,
                baseX,
                average,
                options
            })
            this.lineItem.render(ctx)
        },
        konvaDemo(){
            var stage = new Konva.Stage({
                container:"chart-panel",
                width:800,
                height:510,
            })
            var layer = new Konva.Layer()
            stage.add(layer)
            var canX = stage.width() / 2
            var canY = stage.height() / 2
            /*var rect = new Konva.Rect({
                x:100,
                y:100,
                opacity:.4,
                rotation:40,
                width:100,
                height:200,
                scaleX:1.2,
                scaleY:1.2,
                draggable:true,
                fill:'orange'
            })*/

            var height = 1 / 12 * stage.height()
            var maxWidth = 3 / 4 * stage.width()
            var x = 1/8 * stage.width()
            var y = canY - height / 2
            var innerRect = new Konva.Rect({
                x:x,
                y:y,
                width:100,
                height:height,
                opacity:.7,
                fill:"lightblue",
                cornerRadius:height / 2
            })
            layer.add(innerRect)
            var outRect = new Konva.Rect({
                x:x,
                y:y,
                width:maxWidth,
                height:height,
                stroke:"blue",
                strokeWidth:.5,
                cornerRadius:height / 2
            })
            layer.add(outRect)
            layer.draw()

            innerRect.to({
                width:maxWidth,
                duration:1.4,
                easing:Konva.Easings.EaseOut,
            })
        },
        drawRain(){
            var canvas = document.getElementById("canvas")
            var w = canvas.width = window.innerWidth
            var h = canvas.height = window.innerHeight
            window.addEventListener('resize',function(e){
                w = canvas.width = window.innerWidth
                h = canvas.height = window.innerHeight
            })

            var lineItem = new LineItem()
            console.log(lineItem.hover())
        }
    }
}