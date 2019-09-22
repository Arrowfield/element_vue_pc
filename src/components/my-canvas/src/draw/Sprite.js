//面向对象 封装 继承 多态

/*export default class LineItem{
    constructor(options){
        this.options = options
        this.init()
        this.num = options.length
        this.x = []//最小值
        this.y = []//最大值
        this.start = []//长方形的底部
        this.end = []//长方形的顶部
    }
    init(){
        // console.log(options)
        // this.min = options[2] || 0
        // this.max = options[3] || 0
        for(var i = 0;i<this.num;i++){
            this.x[i] = options[i][3]
            this.y[i] = options[i][4]
        }
       
    }
    draw(){

    }
    filter(){
        
    }
}*/

// function LineItem(options){
//     //this
// }
//
// LineItem.prototype.show = function(){
//
// }
// LineItem.prototype.draw = function(){
//
// }

function Sprite(option) {
    this._init(option)
}

Sprite.prototype = {
    _init: function (option) {
        this.x = 0 ? 0 : (option.x || 10)
        this.y = 0 ? 0 : (option.y || 10)
        this.w = option.w || 40
        this.h = option.h || 65
        this.fps = option.fps || 10 //frame
        this.originW = option.originW || 40
        this.originH = option.originH || 65
        this._imgSrc = option.imgSrc || ""//访问器属性 做限制过滤的
        this._dirIndex = 0
    },
    render: function (ctx) {
        //将自己绘制的画
        //将图片加载
        var img = new Image()
        img.src = this._imgSrc

        var self = this
        img.onload = function () {
            var frameIndex = 0
            setInterval(function () {
                ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)
                ctx.drawImage(
                    img,
                    frameIndex * self.originW,
                    self._dirIndex * self.originH,
                    self.originW,
                    self.originH,
                    self.x,
                    self.y,
                    self.w,
                    self.h
                )
                frameIndex ++
                frameIndex %= 4
            }, 1000 / self.fps) // 每秒画10次
        }
    },
    changeDir:function(dir){
        if(dir == "left"){
            this._dirIndex = 1
        }
        if(dir == "right"){
            this._dirIndex = 2
        }
        if(dir == "up"){
            this._dirIndex = 3
        }
        if(dir == "down"){
            this._dirIndex = 0
        }

    }
}

export default Sprite