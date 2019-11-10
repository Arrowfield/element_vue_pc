<template>
    <v-layer
            @mouseover="handleMouseOver"
            @mouseleave="handleMouseLeave"
    >
        <v-rect :config="scrollBar"></v-rect>
        <v-image :config="scrollCenterBar"></v-image>
        <v-image :config="scrollLeftBtn"></v-image>
        <v-image :config="scrollRightBtn"></v-image>
    </v-layer>
</template>

<script>
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
                    x: 70,
                    y: 330,
                    // width:this.width,
                    // height:14,
                    // fill:"#e1e4e9"
                    image: imageObj,
                    height: 14,
                    width: this.width
                }
            },
            scrollLeftBtn() {
                let imageObj = new Image()
                imageObj.src = this.imageBtn
                //console.log(imageObj)
                return {
                    x: 70,
                    y: 326,
                    image: imageObj,
                    width: 22,
                    height: 22,
                    crop: {x: this.isHoverBtn === 2 ? 22 : 0, y: 0, width: 22, height: 22}
                }
            },
            scrollRightBtn() {
                let imageObj = new Image()
                imageObj.src = this.imageBtn
                imageObj.onload = ()=>{
                    this.imageRightObj = imageObj
                }
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
                imageRightObj:null
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
                switch (e.target.index) {
                    case 1 :
                        break;
                    case 2 :
                        break;
                    case 3 :
                        break;
                }
            },
            handleMouseLeave() {
                this.isHoverBtn = 0
            }
        },
        mounted() {
            //console.log(this.width)
        }
    }
</script>

<style scoped>

</style>