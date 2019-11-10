<template>
    <v-layer
            ref="scroll"
            @mouseover="handleMouseOver"
            @mouseleave="handleMouseLeave"
            @mousedown="handleMouseDown"
    >
        <v-rect :config="scrollBar"></v-rect>
        <v-image :config="scrollCenterBar"></v-image>
        <v-image :config="scrollLeftBtn"></v-image>
        <v-image :config="scrollRightBtn"></v-image>
    </v-layer>
</template>

<script>
    import {handleEvent} from "@/libs/HandleEvent";
    import Bus from "@/components/Bus";
    const SCROLL_BTN_WIDTH = 22
    const SCROLL_BTN_HEIGHT = 22
    const MIN_LEFT_DISTANCE = 70
    const AXIS_Y_DISTANCE = 330
    const SCROLL_BAR_HEIGHT = 14
    export default {
        name: "scroll-bar",
        computed: {
            scrollBar() {
                return {
                    x: MIN_LEFT_DISTANCE,
                    y: AXIS_Y_DISTANCE,
                    width: this.width,
                    height: SCROLL_BAR_HEIGHT,
                    fill: "#e1e4e9"
                }
            },
            scrollCenterBar() {
                let imageObj = new Image()
                imageObj.src = this.isHoverBtn === 1 ? this.imageBarHover : this.imageBar
                return {
                    x: 70 + this.srcollCenterBarWidth,
                    y: 330,
                    image: imageObj,
                    height: 14,
                    width: this.width - this.srcollCenterBarWidth - this.rightBtnActionWidth
                }
            },
            scrollLeftBtn() {
                let imageObj = new Image()
                imageObj.src = this.imageBtn
                //console.log(imageObj)
                return {
                    x: this.leftBtnX,
                    y: AXIS_Y_DISTANCE - (SCROLL_BTN_WIDTH - SCROLL_BAR_HEIGHT) / 2,
                    image: imageObj,
                    width: SCROLL_BTN_WIDTH,
                    height: SCROLL_BTN_HEIGHT,
                    crop: {x: this.isHoverBtn === 2 ? 22 : 0, y: 0, width: 22, height: 22}
                }
            },
            scrollRightBtn() {
                return {
                    x: this.rightBtnX ? this.rightBtnX : MIN_LEFT_DISTANCE + this.width - SCROLL_BTN_WIDTH,
                    y: 326,
                    image: this.imageRightObj,
                    width: 22,
                    height: 22,
                    crop: {x: this.isHoverBtn === 3 ? 22 : 0, y: 0, width: 22, height: 22}
                }
            }
        },
        data() {
            return {
                imageBtn: require('@/assets/icon/scrooll-btn.png'),
                imageBar: require('@/assets/icon/srcoll-center-bar.png'),
                imageBarHover: require('@/assets/icon/srcoll-center-bar-hover.png'),
                isHoverBtn: 0,
                imageRightObj: null,
                leftBtnX: 70,
                isClickLeftBtn: false,
                isClickRightBtn: false,
                srcollCenterBarWidth: 0,
                rightBtnActionWidth:0,
                rightBtnX:0
            }
        },
        props: {
            width: {
                type: Number,
                default: 0
            }
        },
        methods: {
            handleMouseOver(e) {
                this.isHoverBtn = e.target.index
            },
            handleMouseLeave() {
                this.isHoverBtn = 0
            },
            handleMouseDown(e) {
                Bus.$emit(Bus.$options.SCROLL_BTN_MOUSE_DOWN,e)
            },
        },
        mounted() {
            let imageObj = new Image()
            imageObj.src = this.imageBtn
            imageObj.onload = () => {this.imageRightObj = imageObj}
            //滑动事件绑定在canvas上
            handleEvent.on(document.documentElement, 'mousemove', (e) => {
                Bus.$emit(Bus.$options.SCROLL_BTN_MOUSE_MOVE,e)
            })
            //鼠标放下事件绑定在body上
            handleEvent.on(document.documentElement, 'mouseup', () => {
                this.isClickLeftBtn = false
                this.isClickRightBtn = false
            })
            //Bus
            handleEvent.on(Bus,Bus.$options.SCROLL_BTN_MOUSE_MOVE,(e)=>{
                if (e.target.tagName === 'CANVAS' && this.isClickLeftBtn) {
                    //console.log(1231)
                    if (MIN_LEFT_DISTANCE + SCROLL_BTN_WIDTH / 2 <= e.layerX && e.layerX <= this.scrollRightBtn.x + SCROLL_BTN_WIDTH / 2) {
                        this.leftBtnX = e.layerX - SCROLL_BTN_WIDTH / 2
                        this.srcollCenterBarWidth = e.layerX - MIN_LEFT_DISTANCE - SCROLL_BTN_WIDTH / 2
                    }
                }
                if (e.target.tagName === 'CANVAS' && this.isClickRightBtn) {
                    if(this.leftBtnX + SCROLL_BTN_WIDTH / 2 <= e.layerX && e.layerX <= this.width + MIN_LEFT_DISTANCE - SCROLL_BTN_WIDTH / 2){
                        this.rightBtnX = e.layerX - SCROLL_BTN_WIDTH / 2
                        //this.srcollCenterBarWidth = e.layerX - this.leftBtnX
                        this.rightBtnActionWidth = this.width - e.layerX + 70
                    }
                }
            })
            handleEvent.on(Bus,Bus.$options.SCROLL_BTN_MOUSE_DOWN,(e)=>{
                switch (e.target.index) {
                    case 1 :
                        break;
                    case 2 :
                        this.isClickLeftBtn = true
                        break;
                    case 3 :
                        this.isClickRightBtn = true
                        break;
                }
            })
        }
    }
</script>

<style scoped>

</style>