export default class Chess {
    constructor(options) {
        this.imageSrc = options.imageSrc || ""
    }
    render(ctx) {
        ctx.strokeStyle = "#bfbfbf"
        //var me = true
        var image = new Image()
        image.src = this.imageSrc
        var _self = this
        image.onload = function () {
            ctx.drawImage(image, 0, 0, 450, 450)
            _self.drawChess(ctx)
        }

    }
    drawChess(ctx){
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
    noeStep(ctx,i,j,me){
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

}