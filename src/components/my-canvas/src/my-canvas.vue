<template>
    <div class="my-demo-canvas">
        <v-stage :config="configKonva" ref="stage">
            <v-layer>
                <!--            <v-circle :config="configCircle"></v-circle>-->
                <v-line :config="axisY"></v-line>
                <v-line :config="axisX"></v-line>
            </v-layer>
            <v-layer>
                <v-line :config="item" v-for="(item,index) in axisPointX"></v-line>
                <v-line :config="item" v-for="(item,index) in axisPointY"></v-line>
                <v-text :config="item" v-for="(item,index) in axisTextX"></v-text>
                <v-text :config="item" v-for="(item,index) in axisTextY"></v-text>
            </v-layer>
            <v-layer ref="layer">
                <v-rect :config="dataAreaMove"
                        @mousemove="handleMouseMove"
                        @mouseout="handleMouseOut"
                        @mousedown="handleMouseDown"
                        @mouseup="handleMouseUp"
                >
                </v-rect>
                <v-line :config="hoverLine" v-if="isHoverLine"></v-line>
                <v-rect :config="selectedArea"
                        v-if="isShowSelectRect"
                        @mousemove="handleMouseMove"
                        @mousedown="handleMouseDown"
                ></v-rect>
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
                }
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
        },
        methods: {
            resize() {
                let baseDataAreaWidth = document.querySelectorAll(".my-demo-canvas")[0].offsetWidth
                this.configKonva.width = baseDataAreaWidth
                this.configKonva.height = 400
            },
            handleMouseMove(e) {
                const mousePos = this.$refs.stage.getStage().getPointerPosition()
                if (this.lastAction === 1) {
                    this.isHoverLine = false
                    //this.createSelectArea(mousePos)

                } else {

                }
                //相对于整个canvas计算的
                //悬停时候的线条
                Bus.$emit(Bus.$options.SELECT_DATA_AREA,mousePos)

            },
            createSelectArea(position) {
                //框选逻辑
                //let startTime = new Date()
                //this.selectedRange.width = position.x - this.selectedRange.x
            },
            handleMouseOut() {
                this.isHoverLine = false
            },
            handleMouseDown() {
                Bus.$emit(Bus.$options.CLICK_DATA_AREA)
            },
            handleMouseUp() {
                this.lastAction = MOUSE_SELECT_END
                //this.selectedRange.x = 70
                //this.selectedRange.width = 0
            }
        },
        mounted() {
            //Bus.$set(Bus.$data.axis,'axis',this.axis)
            //this.productPop()

            handleEvent.on(window, 'resize', this.resize, false)
            handleEvent.on(document, 'mouseup', this.handleMouseUp)
            handleEvent.on(Bus,Bus.$options.SELECT_DATA_AREA,(position)=>{
                this.isHoverLine = true
                this.hoverLineX = position.x - 70
            })
            handleEvent.on(Bus,Bus.$options.CLICK_DATA_AREA,()=>{
                //const mousePos = this.$refs.stage.getStage().getPointerPosition()
                this.isHoverLine = false
                this.lastAction = MOUSE_SELECT_START
                // this.isShowSelectRect = true
                // this.selectedRange.width = 0
                // this.selectedRange.x = mousePos.x
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

