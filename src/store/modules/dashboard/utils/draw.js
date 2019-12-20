//构造海葵数据
function makeAnt(num,ctx) {
    let data = []
    for (let i = 0; i < num; i++) {
        let obj = {
            rootX:i * 16 + Math.random() * 20,
            headX:i * 16 + Math.random() * 20,
            headY:ctx.canvas.height - 250 + Math.random() * 50,
            amp:50 + Math.random() * 50
        }
        data.push(obj)
    }
    return data
}

/*
* 绘制海葵
* @parmas ctx
* */
export const makeActinian = function (ctx,deltaTime) {
    let ant = makeAnt(50,ctx)
}
/*
* 绘制小鱼的妈妈
* @params ctx
* */
export const makeMom = function (ctx,) {

}

