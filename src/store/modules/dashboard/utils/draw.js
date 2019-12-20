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
    let alpha = 0;
    let l = Math.sin(alpha += deltaTime * 0.0008 )
    ctx.save();
    ctx.strokeStyle = "#3b154e";
    ctx.globalAlpha = 0.6;
    ctx.lineWidth = 20;
    ctx.lineCap = "round";
    for(let i=0; i < ant.length; i++){
        ctx.beginPath();
        ctx.moveTo(ant[i].rootX,ctx.canvas.height);//起点坐标（x,y）
        ant[i].headX = ant[i].rootX + l * ant[i].amp;
        ctx.quadraticCurveTo(ant[i].rootX,ctx.canvas.height-100,ant[i].headX,ant[i].headY);//绘制贝塞尔曲线的方法
        ctx.stroke();
    }
    ctx.restore();
}
/*
* 绘制小鱼的妈妈
* @params ctx
* */
export const makeMom = function (ctx,) {

}

