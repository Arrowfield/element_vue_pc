import Sprite from './Sprite.js'
import Chess from './Chress.js'
import LineItem from "@/components/my-canvas/src/draw/LineItem";
import HoverLine from "@/components/my-canvas/src/draw/HoverLine.js";
import Bus from '@/components/my-canvas/Bus'
// import { handleEvent } from "@/libs/handleEvent.js";
export default {
    data() {
        return {
            list: []
        }
    },
    methods: {
        precessData(options) {
            // this.list.map((item)=>{
            //     return
            // })
            let item = {
                itemX: options.itemX,
                itemY: options.itemY,
                itemWidth: options.itemWidth,
                itemHeight: options.itemHeight,
                itemLineHeight: options.itemLineHeight,
                itemLineWidth: options.itemWidth,
                data: ""
            }
        },
        productPop() {
            let canvas = document.getElementById('canvas')
            let ctx = canvas.getContext('2d')
            //初始化canvas
            Bus.initCanvas(canvas, ctx)
            //画矩形和中间的线
            let
                baseX = 160,
                baseY = 50,
                originX = 80,
                originY = 470,
                axisX = this.axis.xAxis,
                average = baseY / 10,
                lineItems = []//数组中存储

            for (let i = 0; i < axisX.length; i++) {
                let color = "#C23531"
                i === 2 ? color = "#314656" : '#C23531'
                lineItems[i] = new LineItem({
                    originX,
                    originY,
                    axisX,
                    baseX,
                    average, data: this.axis.data[i], index: i, color
                }).render(ctx)
            }
            //画悬停时候的线
            let hoverLine = new HoverLine({}).render(canvas,ctx)

            //目的：当鼠标悬停在矩形或者横线上时，就输出为true
            handleEvent.on(canvas,'mousemove',(e)=>{
                //检测鼠标是否位于矩形中（线段的暂未判断）
                //清除画布
                ctx.clearRect(0,0,canvas.width,canvas.height)
                //初始化画布
                Bus.initCanvas(canvas, ctx)
                //判断鼠标是否在矩形中
                let bool = lineItems.some((item, index) => {
                    return item.isInRect(canvas, e, ctx, index)
                })
                bool ? canvas.style.cursor = "pointer" : canvas.style.cursor = 'auto'
                //画矩形
                for(let item of lineItems){//for --- in遍历的是下标
                    item.render(ctx)
                }
                //画悬停时候的线
                hoverLine.render(canvas,ctx)
            },false)
        },
        konvaDemo() {
            let stage = new Konva.Stage({
                container: "chart-panel",
                width: 800,
                height: 510,
            })
            let layer = new Konva.Layer()
            stage.add(layer)
            let canX = stage.width() / 2
            let canY = stage.height() / 2
            /*let rect = new Konva.Rect({
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

            let height = 1 / 12 * stage.height()
            let maxWidth = 3 / 4 * stage.width()
            let x = 1 / 8 * stage.width()
            let y = canY - height / 2
            let innerRect = new Konva.Rect({
                x: x,
                y: y,
                width: 100,
                height: height,
                opacity: .7,
                fill: "lightblue",
                cornerRadius: height / 2
            })
            layer.add(innerRect)
            let outRect = new Konva.Rect({
                x: x,
                y: y,
                width: maxWidth,
                height: height,
                stroke: "blue",
                strokeWidth: .5,
                cornerRadius: height / 2
            })
            layer.add(outRect)
            layer.draw()

            innerRect.to({
                width: maxWidth,
                duration: 1.4,
                easing: Konva.Easings.EaseOut,
            })
        },
        drawChess() {
            let canvas = document.getElementById("canvas")
            // let w = canvas.width = window.innerWidth
            // let h = canvas.height = window.innerHeight
            // window.addEventListener('resize',function(e){
            //     w = canvas.width = window.innerWidth
            //     h = canvas.height = window.innerHeight
            // })
            canvas.width = 450, canvas.height = 450
            let chessBoard = []
            for (let i = 0; i < 15; i++) {
                chessBoard[i] = []
                for (let j = 0; j < 15; j++) {
                    chessBoard[i][j] = 0
                }
            }

            let ctx = canvas.getContext("2d")
            let chess = new Chess({
                imageSrc: this.waterUrl
            })

            chess.render(ctx)
            let me = true
            canvas.onclick = function (e) {
                let x = e.offsetX
                let y = e.offsetY
                let i = Math.floor(x / 30)
                let j = Math.floor(y / 30)
                if (chessBoard[i][j] == 0) {
                    chess.noeStep(ctx, i, j, me)
                    if (me) {
                        chessBoard[i][j] = 1
                    } else {
                        chessBoard[i][j] = 2
                    }
                }

                me = !me
            }

        },
    },
    beforeDestroy() {
        //删除事件的绑定
    }
}
