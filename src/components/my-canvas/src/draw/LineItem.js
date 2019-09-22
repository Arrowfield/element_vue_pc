//面向对象 封装 继承 多态
export default class LineItem{
    constructor(option){
        this.x = option.x || 0
        this.y = option.y || 0
        this.w = option.w || 0
        this.h = option.h || 0
        this.fillStyle = option.fillStyle || 'black'
    }
    render(ctx){
        ctx.beginPath()
        ctx.fillStyle  = this.fillStyle
        ctx.fillRect(this.x,this.y,this.w,this.h)
        ctx.beginPath()
        ctx.fillStyle = "black"
    }
}