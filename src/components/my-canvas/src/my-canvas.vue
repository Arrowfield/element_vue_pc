<template>
    <div class="my-demo-canvas">
    <v-stage :config="configKonva">
        <v-layer>
            <v-circle :config="configCircle"></v-circle>
        </v-layer>
    </v-stage>
    </div>
</template>

<script>
    import drawMixin from './draw/draw.js'
    import Bus from '@/components/Bus'
    import { handleEvent } from "@/libs/HandleEvent";

    export default {
        name: "my-canvas",
        mixins: [drawMixin],
        data() {
            return {
                configKonva: {
                    width: 0,
                    height: 0
                },
                configCircle: {
                    x: 100,
                    y: 100,
                    radius: 70,
                    fill: "red",
                    stroke: "black",
                    strokeWidth: 4
                },
            }
        },
        methods:{
            resize(){
                let baseDataAreaWidth = document.querySelectorAll(".my-demo-canvas")[0].offsetWidth
                this.configKonva.width = baseDataAreaWidth
                //
                this.configKonva.height = 400

            },
        },
        mounted() {
            //Bus.$set(Bus.$data.axis,'axis',this.axis)
            //this.productPop()
            handleEvent.on(window,'resize',this.resize,false)
            this.resize()
        }
    }
    //svg可以直接绑定事件 canvas则不行 canvas有默认的宽高
</script>

<style scoped>
    #canvas {
        background: #F3F3F3;
        display: block;
        margin: 40px auto 40px;
        box-shadow: 10px 10px 15px #ddd;
    }
    .my-demo-canvas{
        width:16rem;
        margin:1rem auto;
    }
</style>

