//面向对象 封装 继承 多态
export default class LineItem {
    constructor(options) {
        this.originX = options.originX || 0
        this.originY = options.originY || 0
        this.axisX = options.axisX || []
        this.baseX = options.baseX || 0
        this.average = options.average || 0
        this.options = options.options || []
        this.axisRect = [] //存储每个方块的X，Y的坐标范围
        this.axisLine = [] //存储每个方块的X，Y的坐标范围
    }

    render(ctx) {
        ctx.beginPath()
        ctx.strokeStyle = "#C23531"
        ctx.fillStyle = "#C23531"
        for (let i = 0; i <= this.axisX.length; i++) {
            if (i < this.axisX.length) {
                ctx.moveTo(this.originX + this.baseX / 2 + this.baseX * i + .5, this.originY - this.options[i][2] * this.average)
                ctx.lineTo(this.originX + this.baseX / 2 + this.baseX * i + .5, this.originY - this.options[i][3] * this.average)
                var x = this.originX + this.baseX / 2 + this.baseX * i + .5
                var y = (this.options[i][2] + this.options[i][3] )* this.average
                this.axisLine.push({x,y})
                
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

    hover(ctx,x,y){
        //悬停线条变粗 
        //console.log(ctx,x,y)
        console.log(this.axisLine)
        
    }
}