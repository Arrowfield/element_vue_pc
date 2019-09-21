//面向对象 封装 继承 多态

export default class LineItem{
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
}