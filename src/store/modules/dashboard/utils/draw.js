//构造海葵数据
import Ant from './Ant'
import Mom from './Mom'
let ant = null, mom = null, deltaTime = 0, lastTime = 0, mx = 0, my = 0
/*
* canvas的初始化
* @parmas act ，sta
* */
export const canvasInit = function (act, sta) { //动态 静态的绘制
    drawBackground(sta)
    ant = new Ant()
    ant.init(act.canvas.height)
    mom = new Mom()
    mom.init(act.canvas)
}
/*
* canvas重绘
* @params
* */

export const canvasLoop = function (act, sta) {
    //清除画布
    act.clearRect(0, 0, act.canvas.width, act.canvas.height)
    requestAnimationFrame(() => {
        canvasLoop(act, sta)
    })
    let now = new Date()
    deltaTime = now - lastTime
    lastTime = now
    ant.draw(act, deltaTime)
    mom.draw(act, mx, my, deltaTime)
}
/*
* 获取移动的坐标
* @params x,y
* */
export const getArea = function (x, y) {
    mx = x, my = y
}

function drawBackground(ctx) {
    let image = new Image()
    image.src = require("@/assets/img/background.jpg")
    image.onload = () => {
        ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height)
    }
}



