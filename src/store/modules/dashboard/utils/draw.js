//构造海葵数据
import Ant from './Ant'

let ant = null,
    deltaTime = 0,
    lastTime = 0
/*
* canvas的初始化
* @parmas act ，sta
* */
export const canvasInit = function (act,sta) { //动态 静态的绘制
    ant = new Ant()
    ant.init(act.canvas.height)
}

export const canvasLoop = function(act,sta){
    //清除画布
    act.clearRect(0,0,act.canvas.width,act.canvas.height)
    requestAnimationFrame(()=>{canvasLoop(act,sta)})
    let now = new Date()
    deltaTime = now - lastTime
    lastTime = now
    ant.draw(act,deltaTime)
    drawBackground(sta)
}
/*
* 绘制小鱼的妈妈
* @params ctx
* */
export const makeMom = function (ctx,) {

}

function drawBackground(ctx){
    let image = new Image()
    image.src = require("../../../../assets/img/background.jpg")
    image.onload = ()=>{
        ctx.drawImage(image,0,0,ctx.canvas.width,ctx.canvas.height)
    }
}

