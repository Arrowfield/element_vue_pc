
import Sprite from './Sprite.js'
import LineItem from "@/components/my-canvas/src/draw/LineItem";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

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
            let _self = this
            canvas.onmousemove = function(e){
                _self.lineItem.hover(ctx,e.offsetX,e.offsetY)
            }
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
            // var w = canvas.width = window.innerWidth
            // var h = canvas.height = window.innerHeight
            // window.addEventListener('resize',function(e){
            //     w = canvas.width = window.innerWidth
            //     h = canvas.height = window.innerHeight
            // })
            var chessBoard = []
            for(var i = 0;i<15;i++){
                chessBoard[i] = []
                for(var j = 0;j<15;j++){
                    chessBoard[i][j] = 0
                }
            }

            var ctx = canvas.getContext("2d")
            ctx.strokeStyle = "#bfbfbf"
            var me = true
            var image = new Image()
            image.src = this.waterUrl
            image.onload = function(){
                ctx.drawImage(image,0,0,450,450)
                drawChess()
                // noeStep(0,0,true)
                // noeStep(1,1,false)
            }
            var drawChess = function(){
                for(var i = 0;i < 15;i++){
                    //竖
                    ctx.moveTo(15 ,15 + 30 * i + .5)
                    ctx.lineTo(435 ,15 + 30 * i + .5)
                    //横
                    ctx.moveTo(15+ i * 30 + .5,15)
                    ctx.lineTo(15 + i * 30 + .5,435)
                }
                ctx.stroke()
            }
            var noeStep = function(i,j,me){
                ctx.beginPath()
                ctx.arc(15 + i * 30,15 + j * 30,13,0,2 * Math.PI)
                ctx.closePath()
                var gradient = ctx.createRadialGradient(15 + i * 30 + 2,15 + j * 30 - 2,13,15 + i * 30 + 2,15 + j * 30 - 2,0)
                if(me){
                    gradient.addColorStop(0,"#0a0a0a")
                    gradient.addColorStop(1,"#636766")
                }else{
                    gradient.addColorStop(0,"#d1d1d1")
                    gradient.addColorStop(1,"#f9f9f9")
                }
               
                ctx.fillStyle = gradient
                ctx.fill()
            }

            canvas.onclick = function(e){
                var x = e.offsetX
                var y = e.offsetY
                var i = Math.floor(x / 30)
                var j = Math.floor(y / 30)
                if(chessBoard[i][j] == 0){
                    noeStep(i,j,me)
                    if(me){
                        chessBoard[i][j] = 1
                    }else{
                        chessBoard[i][j] = 2
                    }
                }
                
                me = !me
            }
            
        }
    }
}