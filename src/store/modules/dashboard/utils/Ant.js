export default class Ant {
    constructor() {
        this.num = 50
        this.rootx = []
        this.headx = []
        this.heady = []
        this.amp = []
        this.alpha = 0
    }

    init(canHeight) {
        let h = canHeight;
        for (var i = 0; i < this.num; i++) {
            //初始化起点的坐标
            this.rootx[i] = i * 16 + Math.random() * 20;
            //初始化终点的坐标【与起点相同】
            this.headx[i] = this.rootx[i];
            //初始化终点的坐标
            this.heady[i] = canHeight - 250 + Math.random() * 50;
            //初始化摆动的幅度
            this.amp[i] = 50 + Math.random() * 50;
        }
    }

    draw(ctx,deltaTime) {
        //绘制50根海葵
        this.alpha += deltaTime * 0.0008;
        let l = Math.sin(this.alpha);
        ctx.save();
        ctx.strokeStyle = "#3b154e";
        ctx.globalAlpha = 0.6;
        ctx.lineWidth = 20;
        ctx.lineCap = "round";
        for(let i=0; i < this.num; i++){
            ctx.beginPath();
            ctx.moveTo(this.rootx[i],ctx.canvas.height);//起点坐标（x,y）
            this.headx[i] = this.rootx[i] + l * this.amp[i];
            ctx.quadraticCurveTo(this.rootx[i],ctx.canvas.height-100,this.headx[i],this.heady[i]);//绘制贝塞尔曲线的方法
            ctx.stroke();
        }
        ctx.restore();
    }
}
