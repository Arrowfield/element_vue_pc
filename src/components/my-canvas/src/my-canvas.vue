<template>
    <div class="my-demo-canvas">
        <v-stage :config="configKonva" ref="stage" @contextmenu="handleContext">
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
            <v-layer>
                <v-rect :config="scrollBar"></v-rect>
                <v-rect :config="scrollCenterBar"></v-rect>
                <v-image :config="scrollLeftBtn"></v-image>
                <v-image :config="scrollRightBtn"></v-image>
            </v-layer>
        </v-stage>
    </div>
</template>

<script>
    import drawMixin from './draw/draw.js'
    import Bus from '@/components/Bus'
    import {handleEvent} from "@/libs/HandleEvent";

    const MOUSE_SELECT_START = 1
    const MOUSE_SELECT_END = 2
    export default {
        name: "my-canvas",
        mixins: [drawMixin],
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
                imageBtn:require('@/assets/icon/scrooll-btn.png')
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
                let i = 0, pointLine = []
                while (i < Math.floor(this.configKonva.width - 70 * 2) / 100) {
                    pointLine.push(
                        {
                            x: 70 + i * 100,
                            y: 300,
                            points: [0, 0, 0, 7],
                            stroke: "#ACB2BF",
                            strokeWidth: 1
                        }
                    )
                    i++
                }
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
                let i = 0, pointLine = []
                while (i < Math.floor(this.configKonva.width - 70 * 2) / 100) {
                    pointLine.push(
                        {
                            x: 70 + i * 100 - 50,
                            y: 300 + 10,
                            text: '00:00',
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
                let i = 0,paths = [],data = "",distance = (this.configKonva.width - 140) / 1000
                while(i < 1000){
                    let path = {x:distance * i,y:Math.random() * 240}
                    paths.push(path)
                    i ++
                }
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
                    // fill:"#c541b1",
                    stroke:"#c541b1",
                    strokeWidth:1.5
                }
            },
            scrollBar(){
                return{
                    x:70,
                    y:330,
                    width:this.baseDataAreaWidth,
                    height:14,
                    fill:"#e1e4e9"
                }
            },
            scrollCenterBar(){

            },
            scrollLeftBtn(){
                let imageObj = new Image()
                imageObj.src = this.imageBtn
                return{
                    x:70,
                    y:326,
                    image:imageObj,
                    width:22,
                    height:22,
                    crop:{x:0,y:0,width:22,height:22}
                }
            },
            scrollRightBtn(){
                let imageObj = new Image()
                imageObj.src = this.imageBtn
                return{
                    x:70 + this.baseDataAreaWidth - 22,
                    y:326,
                    image:imageObj,
                    width:22,
                    height:22,
                    crop:{x:0,y:0,width:22,height:22}
                }
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
            handleContext(){
                return false
            }
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

