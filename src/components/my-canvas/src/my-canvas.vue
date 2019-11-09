<template>
    <div class="my-demo-canvas">
        <v-stage :config="configKonva">
            <v-layer>
                <!--            <v-circle :config="configCircle"></v-circle>-->
                <v-line :config="axisY"></v-line>
                <v-line :config="axisX"></v-line>
            </v-layer>
            <v-layer>
                <v-line :config="item" v-for="(item,index) in axisPointX" ></v-line>
                <v-line :config="item" v-for="(item,index) in axisPointY" ></v-line>
                <v-text :config="item" v-for="(item,index) in axisTextX"  ></v-text>
                <v-text :config="item" v-for="(item,index) in axisTextY"  ></v-text>
            </v-layer>
            <v-layer ref="layer">
                <v-rect :config="dataAreaMove"
                        @mousemove="handleMouseMove"
                    @mouseout="handleMouseOut"
                >
                </v-rect>
                <v-line :config="hoverLine" v-if="isHoverLine"></v-line>
            </v-layer>
        </v-stage>
    </div>
</template>

<script>
    import drawMixin from './draw/draw.js'
    import Bus from '@/components/Bus'
    import {handleEvent} from "@/libs/HandleEvent";

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
                isHoverLine:false
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
            dataAreaMove(){
              return{
                  x:70,
                  y:60,
                  width:this.configKonva.width - 140,
                  height:240
              }
            },
            hoverLine(){
                return{
                    x:70,
                    y:60,
                    points:[10,0,10,240],
                    stroke: "black",
                    strokeWidth: 2
                }
            },

        },
        methods: {
            resize() {
                let baseDataAreaWidth = document.querySelectorAll(".my-demo-canvas")[0].offsetWidth
                this.configKonva.width = baseDataAreaWidth
                //
                this.configKonva.height = 400
            },
            handleMouseMove(e){
                console.log(e)
                this.isHoverLine = true
            },
            handleMouseOut(){
                this.isHoverLine = false
            },
        },
        mounted() {
            //Bus.$set(Bus.$data.axis,'axis',this.axis)
            //this.productPop()
            handleEvent.on(window, 'resize', this.resize, false)
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

