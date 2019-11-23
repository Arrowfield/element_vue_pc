import Vue from 'vue'
// import LineItem from "@/components/my-canvas/src/draw/LineItem"
const MOUSE_MOVE_DATA_AREA = "mousemoveDataArea"
const CLICK_DATA_AREA = "clickDataArea"
const MOUSE_OUT_DATA_AREA = "mouseoutDataArea"
const MOUSE_UP_DATA_AREA = "mouseupDataArea"
const SCROLL_BTN_MOUSE_MOVE = "scrollbtnMousemove"
const SCROLL_BTN_MOUSE_DOWN = "scrollbtnMousedown"
export default new Vue({
    MOUSE_MOVE_DATA_AREA,
    CLICK_DATA_AREA,
    MOUSE_OUT_DATA_AREA,
    MOUSE_UP_DATA_AREA,
    SCROLL_BTN_MOUSE_MOVE,
    SCROLL_BTN_MOUSE_DOWN,
    data() {
        return {
            name: "zhangsan",
            axisRect: [],//存储每个矩形对象的坐标x，y
            axisLine: [],//存储每个线段对象的x，y
            axis:{},
            lineItems:[],
        }
    },
    methods: {
        isInRect(timeStamp) {
            return timeStamp
        },
        initCanvas(canvas, ctx) {
            canvas.width = 800
            canvas.height = 510
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

            let
                baseX = 160,
                baseY = 50,
                pointWidth = 8,
                originX = 80,
                originY = 470,
                axisX = this.axis.axis.xAxis,
                axisY = this.axis.axis.yAxis,
                options = this.axis.axis.data,
                font = 12,
                average = baseY / 10,
                strokeColor = "black";
            ctx.lineWidth = 1
            //绘制竖线
            ctx.moveTo(originX + .5, originY)
            ctx.lineTo(originX + .5, originY - this.axis.axis.yAxis.length * baseY)
            //绘制横线
            ctx.moveTo(originX, originY + .5)
            ctx.lineTo(originX + this.axis.axis.xAxis.length * baseX, originY + .5)
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
                ctx.lineTo(originX + this.axis.axis.xAxis.length * baseX, originY - i * baseY + .5)
            }
            ctx.stroke()
            //绘制矩形

        }
    }
})

//Bus（本质：vue的实例）中的资源（属性和方法）所有的组件都可以使用，类似于window中的资源所有组件都可以使用
//Bus.$on('事件名',(params)=>{})
//Bus.$emit('事件名',params)