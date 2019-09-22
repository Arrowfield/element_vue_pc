//面向对象 封装 继承 多态
export default class LineItem {
    constructor(options) {
        this.originX = options.originX || 0
        this.originY = options.originY || 0
        this.axisX = options.axisX || []
        this.baseX = options.baseX || 0
        this.average = options.average || 0
        this.options = options.options || []
    }

    render(ctx) {
        ctx.beginPath()
        ctx.strokeStyle = "#C23531"
        ctx.fillStyle = "#C23531"
        for (let i = 0; i <= this.axisX.length; i++) {
            if (i < this.axisX.length) {
                ctx.moveTo(this.originX + this.baseX / 2 + this.baseX * i + .5, this.originY - this.options[i][2] * this.average)
                ctx.lineTo(this.originX + this.baseX / 2 + this.baseX * i + .5, this.originY - this.options[i][3] * this.average)
                var rectX = this.originX + this.baseX / 2 + this.baseX * i - 50 + .5
                var rectY = this.originY - this.options[i][1] * 5
                var rectWidth = 100
                var rectHeight = (this.options[i][1] - this.options[i][0]) * this.average
                if (rectHeight == 0) {
                    rectHeight = 1.5
                }
                ctx.fillRect(rectX, rectY, rectWidth, rectHeight)
            }
        }
        ctx.stroke()
    }
    hover(){
        //悬停变大
    }
}