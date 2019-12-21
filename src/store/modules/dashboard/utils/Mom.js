function leapDistance(aim, cur, ratio) {
    let delta = cur - aim;
    return aim + delta * ratio;
}

function leapAngle(a, b, t) {
    let d = b - a;
    if (d > Math.PI) d = d - 2 * Math.PI;
    if (d < -Math.PI) d = d + 2 * Math.PI;
    return a + d * t;
}

export default class Mom {
    constructor() {
        this.x;
        this.y;
        this.angle;       //鱼的游动角度
        this.bigEye = []; //眼睛
        this.bigBody = [];//身体
        this.bigTail = [];//尾巴
        //切换在大鱼眼睛的图片
        this.bigEyeStart = 0;//计算开始
        this.bigEyeEnd = 2000;//计算结果
        this.bigEyeIndex = 0;//图片下标
    }

    init(canvas) {
        this.x = canvas.width * 0.5;
        this.y = canvas.height * 0.5;
        this.angle = 0;
        //加载图片眼睛2张
        for (let i = 0; i < 2; i++) {
            this.bigEye[i] = new Image();
            this.bigEye[i].src = require("@/assets/img/bigEye" + i + ".png")
        }
        //加载图片身体8张
        for (let i = 0; i < 8; i++) {
            this.bigBody[i] = new Image();
            this.bigBody[i].src = require("@/assets/img/bigSwim" + i + ".png")
        }
        //加载图片尾巴8张
        for (let i = 0; i < 8; i++) {
            this.bigTail[i] = new Image();
            this.bigTail[i].src = require("@/assets/img/bigTail" + i + ".png")
        }
    }

    draw(ctx, mx, my, deltaTime) {
        //让大鱼面向鼠标慢慢的游过去
        //if(!mx || !my) return
        this.x = leapDistance(mx, this.x, 0.98);
        this.y = leapDistance(my, this.y, 0.99);
        /*三步的套路*/
        //获取坐标差：大鱼  鼠标位置
        let deltaY = my - this.y;
        let deltaX = mx - this.x;
        //获取角度差：大鱼 鼠标
        let beta = Math.atan2(deltaY, deltaX) + Math.PI;
        //函数计算新大鱼的角度
        this.angle = leapAngle(beta, this.angle, 0.9);
        //计算大鱼眼睛的切换
        this.bigEyeStart = this.bigEyeStart + deltaTime;
        //切换大鱼眼睛的判断
        if (this.bigEyeStart > this.bigEyeEnd) {
            this.bigEyeIndex = (this.bigEyeIndex + 1) % 2;
            this.bigEyeStart = 0;
            //闭眼的持续时间
            if (this.bigEyeIndex === 1) {
                this.bigEyeEnd = 200;
            }
            //睁眼的持续时间
            if (this.bigEyeIndex === 0) {
                this.bigEyeEnd = 2000;
            }
        }
        //保存画笔的状态
        ctx.save();
        //移动原点
        ctx.translate(this.x, this.y);
        //旋转角度
        ctx.rotate(this.angle);
        //会制鱼的身体；鱼的眼睛；尾巴；

        ctx.drawImage(
            this.bigEye[this.bigEyeIndex],
            -this.bigEye[this.bigEyeIndex].width * 0.5,
            -this.bigEye[this.bigEyeIndex].height * 0.5
        )


        ctx.drawImage(
            this.bigBody[0],
            -this.bigBody[0].width * 0.5,
            -this.bigBody[0].height * 0.5
        )


        ctx.drawImage(
            this.bigTail[0],
            -this.bigTail[0].width * 0.5 + 30,
            -this.bigTail[0].height * 0.5
        )
        //重置画笔状态
        ctx.restore();
    }
}