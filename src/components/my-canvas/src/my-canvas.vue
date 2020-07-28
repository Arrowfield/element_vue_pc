<template>
    <div class="my-demo-canvas">
        <v-stage :config="configKonva" ref="stage">
            <v-layer>
                <!--            <v-circle :config="configCircle"></v-circle>-->
                <v-line :config="axisY"></v-line>
                <v-line :config="axisX"></v-line>
                <v-line :config="item" v-for="(item,index) in axisPointX"></v-line>
                <v-line :config="item" v-for="(item,index) in axisPointY"></v-line>
                <v-text :config="item" v-for="(item,index) in axisTextX"></v-text>
                <v-text :config="item" v-for="(item,index) in axisTextY"></v-text>
            </v-layer>
            <v-layer>
                <v-path :config="configPath"></v-path>
                <!-- <v-circle :config="item" v-for="(item,index) in configPoint"></v-circle> -->
            </v-layer>
            <v-layer>
                <v-rect :config="dataAreaMove"
                        @mousemove="handleMouseMove"
                        @mouseout="handleMouseOut"
                        @mousedown="handleMouseDown"
                        @mouseup="handleMouseUp"
                >
                </v-rect>
                <v-line :config="hoverLine" v-if="isHoverLine"></v-line>
                <v-text :config="item" v-for="(item,index) in hoverText" v-if="isHoverLine"></v-text>
                <v-rect :config="selectedArea"
                        v-if="isShowSelectRect"
                        @mousemove="handleMouseMove"
                        @mousedown="handleMouseDown"
                ></v-rect>
            </v-layer>
            <scorll-bar :width="baseDataAreaWidth"></scorll-bar>
        </v-stage>
    </div>
</template>

<script>
    import drawMixin from './draw/draw.js'
    import Bus from '@/components/my-canvas/Bus'
    // import {handleEvent} from "@/libs/handleEvent";
    import ScorllBar from './scroll-bar'
    import DouglasPeucker  from '@/libs/DouglasPeucker'

    const MOUSE_SELECT_START = 1
    const MOUSE_SELECT_END = 2
    const DATA_NUMBER_TOTAL = 25
    //const DATA_SELECT_AREA =
    const AXIS_TIME_SHOW = 20


    /**
     * 2 2
     * 4 4
     * 定义规则：超过20个数据
     * 1 : width / 20
     *  : width / 22
     * 5 : 100
     * 50 : 1000
     * */

    export default {
        name: "my-canvas",
        mixins: [drawMixin],
        components:{
            ScorllBar
        },
        data() {
            return {
                configKonva: {width: 0, height: 0},
                axisY: {
                    x: 70,
                    y: 60,
                    points: [0, 0, 0, 240],
                    stroke: "#ACB2BF",
                    strokeWidth: 1
                },
                isHoverLine: false,
                isShowSelectRect: false,
                hoverLineX: 10,
                lastAction: "",
                selectedRange: {
                    x: 70,
                    width: 0,
                },
                baseDataAreaWidth:0,
                points:[],
                dataTimeNumber:18
            }
        },
        computed: {
            axisX() {
                return {
                    x: 70,
                    y: 300,
                    points: [0, 0, this.configKonva.width && this.configKonva.width - 140, 0],
                    stroke: "#ACB2BF",
                    strokeWidth: 1
                }
            },
            axisPointX() {
                /*
                * 分析：生成100个点
                * */
                //let distance = (this.configKonva.width - 70 * 2) / DATA_NUMBER_TOTAL
                let i = 0, pointLine = []

                //let distance = (this.configKonva.width - 70 * 2) / this.dataTimeNumber


                let distance = (this.configKonva.width - 70 * 2) / DATA_NUMBER_TOTAL
                /*
                * 已知显示的数量：DATA_NUMBER_TOTAL
                * 已知总宽度：this.configKonva.width - 70 * 2
                * 求出了一个点显示的距离 distance
                * 1 : 20    1倍的distance
                * X : 25    x倍的distance（缩小比例）
                * 数学转化的问题：
                *
                * * */
                let dataCount = DATA_NUMBER_TOTAL
                if(DATA_NUMBER_TOTAL > 20){
                    //distance
                    dataCount = 17
                }

                while (i <= dataCount) {
                    pointLine.push(
                        {
                            x: 70 + i * distance ,
                            y: 300,
                            points: [0, 0, 0, 7 ],
                            stroke: "#ACB2BF",
                            strokeWidth: 1
                        }
                    )
                    i++
                }
                //console.log(pointLine)

                let result = new DouglasPeucker(pointLine).compress()
                return pointLine
            },
            axisPointY() {
                let i = 0, pointLine = []
                while (i < Math.floor(240 / 30) + 1) {
                    pointLine.push(
                        {
                            x: 70,
                            y: 300 - i * 30,
                            points: [0, 0, -7, 0],
                            stroke: "#ACB2BF",
                            strokeWidth: 1
                        }
                    )
                    i++
                }
                return pointLine
            },
            axisTextX() {
               /*
               * 分析：100个点相当于100s，每秒采集数据一次，00:00:00
               * 知道总时长，=》知道显示多少个点，坐标轴显示17个点，在不拖动滚动条的情况下
               * */
                let i = 0, pointLine = [],m = 0,s = 0

                let distance = (this.configKonva.width - 70 * 2) / this.dataTimeNumber
                let time = Math.ceil(DATA_NUMBER_TOTAL / (this.dataTimeNumber-1))  //100/17 = 5 ...15

                while (i < this.dataTimeNumber) {

                    s = i * time
                    if(s < 10){
                        s = `0${s}`
                    }else if(s >= 60){
                        m = Math.floor(s / 60)
                        s %= 60

                        if(s < 10){
                            s = `0${s}`
                        }
                    }

                    if(m < 10 || m == 0){
                        m = `0${parseInt(m)}`
                    }
                    pointLine.push(
                        {
                            x: 70 + i * distance - 50,
                            y: 300 + 10,
                            text: `${m}:${s}`,
                            fontSize: 13,
                            fontFamily: 'Calibri',
                            fill: '#333',
                            width: 100,
                            align: "center"
                        }
                    )
                    i++
                }
                return pointLine
            },
            axisTextY() {
                let i = 0, pointLine = []
                while (i < Math.floor(240 / 30) + 1) {
                    pointLine.push(
                        {
                            x: 70 - 10 - 13,
                            y: 300 - i * 30 - 13 / 2,
                            text: `${i}0`,
                            fontSize: 13,
                            fontFamily: 'Calibri',
                            fill: '#333',
                            verticalAlign: "middle"
                        }
                    )
                    i++
                }
                return pointLine
            },
            dataAreaMove() {
                return {
                    x: 70,
                    y: 60,
                    width: this.configKonva.width - 140,
                    height: 240
                }
            },
            hoverLine() {
                return {
                    x: 70,
                    y: 60,
                    points: [this.hoverLineX, 0, this.hoverLineX, 240],
                    stroke: "black",
                    strokeWidth: 1
                }
            },
            hoverText() {
                let i = 0, pointLine = []
                let hoverText = [{label:"fps",val:"50.5"},{label:"jank",val:"10.8"},{label:"bigjank",val:"5.9"}]
                while (i < 3) {
                    pointLine.push(
                        {
                            x: this.hoverLineX + 74,
                            y: 60 + i * 18,
                            text: `${hoverText[i].label} : ${hoverText[i].val}`,
                            fontSize: 14,
                            fontFamily: 'Calibri',
                            fill: '#333',
                            width: 100,
                            align: "left",
                            height:18
                        }
                    )
                    i++
                }
                return pointLine
            },
            selectedArea() {
                return {
                    x: this.selectedRange.x,
                    y: 60,
                    width: this.selectedRange.width,
                    height: 240,
                    fill: 'rgba(0,84,216,.2)',
                    stroke: "#1364e9",
                    strokeWidth: 2,
                }
            },
            configPath() {
                //生成一万个点
                let i = 0,paths = [],data = ""
                //let distance = (this.configKonva.width - 70 * 2) / this.dataTimeNumber
                //let time = Math.ceil(DATA_NUMBER_TOTAL / (this.dataTimeNumber-1))  //100/17 = 5 ...15
                let distance = (this.configKonva.width - 70 * 2) / DATA_NUMBER_TOTAL

                while(i <= DATA_NUMBER_TOTAL){
                    let path = {x:distance * i,y:Math.random() * 240}
                    paths.push(path)
                    i ++
                }
                this.points = paths
                paths.forEach((item,index)=>{
                    if(index === 0) {
                        data += `M${item.x} ${-item.y} `
                    }else{
                        data += `L${item.x} ${-item.y} `
                    }

                })//构造一个新数组
                //console.log(data)
                return {
                    x: 70,
                    y: 300,
                    data,
                    stroke:"#c541b1",
                    strokeWidth:1
                }
            },
            configPoint(){

                let i = 0,points = []
                while(i < DATA_NUMBER_TOTAL){
                    points.push({
                        x:70 + this.points[i].x ,
                        y:300 - this.points[i].y ,
                        fill:"#c541b1",
                        radius:2
                    })
                    i ++
                }
                return points
            }
        },
        methods: {
            resize() {
                let baseDataAreaWidth = document.querySelectorAll(".my-demo-canvas")[0].offsetWidth
                this.configKonva.width = baseDataAreaWidth
                this.configKonva.height = 400
                this.baseDataAreaWidth = this.configKonva.width - 140
            },
            handleMouseMove(e) {
                Bus.$emit(Bus.$options.MOUSE_MOVE_DATA_AREA, e)
            },
            handleMouseOut(e) {
                Bus.$emit(Bus.$options.MOUSE_OUT_DATA_AREA, e)
            },
            handleMouseDown(e) {
                Bus.$emit(Bus.$options.CLICK_DATA_AREA, e)
            },
            handleMouseUp(e) {
                Bus.$emit(Bus.$options.MOUSE_UP_DATA_AREA, e)
            },
        },
        mounted() {
            handleEvent.on(window, 'resize', this.resize, false)
            handleEvent.on(document, 'mouseup', this.handleMouseUp)
            handleEvent.on(Bus, Bus.$options.MOUSE_MOVE_DATA_AREA, (e) => {
                //const mousePos = this.$refs.stage.getStage().getPointerPosition()
                const mousePos = {x: e.evt.layerX, y: e.evt.layerY}
                if (this.lastAction === 1) {
                    this.isHoverLine = false
                    this.isShowSelectRect = true
                    this.selectedRange.width = mousePos.x - this.selectedRange.x//绝对值
                    //console.log(Math.abs(this.selectedRange.width) + 70,this.selectedRange.x)
                    if (this.selectedRange.width < 0 && Math.abs(this.selectedRange.width) + 70 >= this.selectedRange.x) {
                        this.selectedRange.width = -this.selectedRange.x + 70
                    }
                } else {
                    this.isHoverLine = true
                    this.hoverLineX = mousePos.x - 70
                    //console.log(this.selectedRange.x,this.hoverLineX)
                    if(this.selectedRange.x === this.hoverLineX){
                        this.isHoverLine = false
                    }
                }
            })
            handleEvent.on(Bus, Bus.$options.CLICK_DATA_AREA, (e) => {
                const mousePos = {x: e.evt.layerX, y: e.evt.layerY}
                this.isHoverLine = false
                this.isShowSelectRect = false
                this.lastAction = MOUSE_SELECT_START
                this.selectedRange.width = 0
                this.selectedRange.x = mousePos.x
            })
            handleEvent.on(Bus, Bus.$options.MOUSE_OUT_DATA_AREA, () => {
                this.isHoverLine = false
            })
            handleEvent.on(Bus, Bus.$options.MOUSE_UP_DATA_AREA, () => {
                this.lastAction = MOUSE_SELECT_END
                // this.selectedRange.x = 70
                // this.selectedRange.width = 0
                // this.isShowSelectRect = false
            })
            this.resize()
        }
    }
    //svg可以直接绑定事件 canvas则不行 canvas有默认的宽高

    //绘制一条线
    /**
     * x:70,y:60,length:240,color:#ACB2BF
     * y:
     * 小线段：
     * 文字：
     * 在固定的情况下，我想将总的时间显示分为20段，进行显示
     * 100s 分20段 5s
     * 60s 分20段 3s
     * 1000s 分20段 20s
     * 点数不固定：那么应该怎样调整点数呢？，多少s显示一个点数呢
     * 1.首先点的数量做不到保持一致
     * 2.点与点之间的距离没发保持一致
     * 将数据进行分组：每组多少怎么确定，分的组数怎么确定 吧
     * */
</script>

<style scoped>
    #canvas {
        background: #F3F3F3;
        display: block;
        margin: 40px auto 40px;
        box-shadow: 10px 10px 15px #ddd;
    }

    .my-demo-canvas {
        width: 16rem;
        margin: 1rem auto;
    }
</style>

