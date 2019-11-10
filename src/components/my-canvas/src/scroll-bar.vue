<template>
    <v-layer
            ref="scroll"
            @mouseover="handleMouseOver"
            @mouseleave="handleMouseLeave"
            @mousedown="handleMouseDown"
            @mouseup="handleMouseUp"
    >
        <v-rect :config="scrollBar"></v-rect>
        <v-image :config="scrollCenterBar"></v-image>
        <v-image :config="scrollLeftBtn"></v-image>
        <v-image :config="scrollRightBtn"></v-image>
    </v-layer>
</template>

<script>
    import {handleEvent} from "@/libs/HandleEvent";

    const SCROLL_BTN_WIDTH = 22
    const MIN_LEFT_DISTANCE = 70
    export default {
        name: "scroll-bar",
        computed: {
            scrollBar() {
                return {
                    x: 70,
                    y: 330,
                    width: this.width,
                    height: 14,
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
                    width: this.width - this.srcollCenterBarWidth
                }
            },
            scrollLeftBtn() {
                let imageObj = new Image()
                imageObj.src = this.imageBtn
                //console.log(imageObj)
                return {
                    x: this.leftBtnX,
                    y: 326,
                    image: imageObj,
                    width: 22,
                    height: 22,
                    crop: {x: this.isHoverBtn === 2 ? 22 : 0, y: 0, width: 22, height: 22}
                }
            },
            scrollRightBtn() {
                return {
                    x: 70 + this.width - 22,
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
                srcollCenterBarWidth: 0,
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
            handleMouseMove(e) {
                //这个事件我想绑定在整个canvas上
                e.evt.cancelBubble = true


            },
            handleMouseDown(e) {
                switch (e.target.index) {
                    case 1 :
                        break;
                    case 2 :
                        //console.log(this.leftBtnX,e.evt.layerX)
                        this.isClickLeftBtn = true
                        break;
                    case 3 :
                        break;
                }
            },
            handleMouseUp(e) {
            },
        },
        mounted() {
            let imageObj = new Image()
            imageObj.src = this.imageBtn
            imageObj.onload = () => {
                this.imageRightObj = imageObj
            }
            //滑动事件绑定在canvas上
            //console.log(this.$refs.scroll)
            handleEvent.on(document.documentElement, 'mousemove', (e) => {
                if (e.target.tagName === 'CANVAS' && this.isClickLeftBtn) {
                    if (MIN_LEFT_DISTANCE + SCROLL_BTN_WIDTH / 2 <= e.layerX && e.layerX <= this.width + MIN_LEFT_DISTANCE - SCROLL_BTN_WIDTH / 2) {
                        this.leftBtnX = e.layerX - SCROLL_BTN_WIDTH / 2
                        this.srcollCenterBarWidth = e.layerX - MIN_LEFT_DISTANCE - SCROLL_BTN_WIDTH / 2
                    }
                }
            })
            //鼠标放下事件绑定在body上
            handleEvent.on(document.documentElement, 'mouseup', () => {
                this.isClickLeftBtn = false
            })
        }
    }
</script>

<style scoped>

</style>