import Vue from 'vue'

export default new Vue({
    data() {
        return {
            name: "zhangsan",
            axisRect: [],//存储每个矩形对象的坐标x，y
            axisLine: [],//存储每个线段对象的x，y
            axis:{}
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
        }
    }
})

//Bus（本质：vue的实例）中的资源所有的组件都可以使用，类似于window中的资源所有组件都可以使用
//Bus.$on('事件名',(params)=>{})
//Bus.$emit('事件名',params)