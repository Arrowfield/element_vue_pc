//面向对象 封装 继承 多态
export default class LineItem {
    //构造
    constructor(options) {

        this.originX = options.originX || 0
        this.originY = options.originY || 0
        this.axisX = options.axisX || []
        this.baseX = options.baseX || 0
        this.average = options.average || 0
        /*this.options = options.options || []
        this.axisRect = [] //存储每个方块的X，Y的坐标范围
        this.axisLine = [] //存储每个方块的X，Y的坐标范围
        this.list = []*/
        this.data = options.data
        this.index = options.index
        this.color = options.color
    }

    //渲染
    render(ctx) {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.strokeStyle = this.color
        ctx.moveTo(this.originX + this.baseX / 2 + this.baseX * this.index + .5, this.originY - this.data[2] * this.average)
        ctx.lineTo(this.originX + this.baseX / 2 + this.baseX * this.index + .5, this.originY - this.data[3] * this.average)

        let rectX = this.originX + (this.index * this.baseX) * 1 + 80 - 50
        let rectY = this.originY - this.data[1] * this.average
        let rectWidth = 100
        let rectHeight = (this.data[1] - this.data[0]) * this.average
        if (rectHeight == 0) rectHeight = 1.5

        ctx.fillRect(rectX, rectY, rectWidth, rectHeight)

        /*

        for (let i = 0; i <= this.axisX.length; i++) {
            if (i < this.axisX.length) {

                let x = this.originX + this.baseX / 2 + this.baseX * i + .5
                let y = (this.options[i][2] + this.options[i][3]) * this.average



                //构造数据
                let item = {
                    itemX:rectX,
                    itemY:rectY,
                    itemRectWidth:rectWidth,
                    itemRectHeight:rectHeight
                }
                this.list.push(item)
            }
        }*/

        ctx.closePath()
        ctx.stroke()
    }

    //悬停
    hover(canvas, e) {
        let obj = canvas.getBoundingClientRect()
        //定义一个数组存储每个对象的
        //检测鼠标是否在canvas中，水平方向上
        // if(e.clientX>obj.left &&e.clientX < obj.right ){
        //     console.log('水平方向上')
        // }
        let left = e.clientX - obj.left, top = e.clientY - obj.top
        //检测鼠标是否在每个小举行中

        let bool = this.list.some((item) => {
            return left > item.itemX && left < item.itemX + item.itemRectWidth && top > item.itemY && top < item.itemY + item.itemRectHeight
        })

        bool ? canvas.style.cursor = "pointer" : canvas.style.cursor = "auto"

    }

    //框选
    boxSelect() {

    }

    //鼠标滚动
    mouseRoll() {

    }
}