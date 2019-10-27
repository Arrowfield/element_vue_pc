export default class HoverLine{
    constructor(){

    }
    render(canvas,ctx){
        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.moveTo(100,canvas.height)
        ctx.lineTo(100,200)

        ctx.stroke()
        return this
    }
}