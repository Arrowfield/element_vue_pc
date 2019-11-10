<template>
    <v-layer>
        <v-rect :config="scrollBar"></v-rect>
        <v-rect :config="scrollCenterBar"></v-rect>
        <v-image :config="scrollLeftBtn"></v-image>
        <v-image :config="scrollRightBtn"></v-image>
    </v-layer>
</template>

<script>
    export default {
        name: "scroll-bar",
        computed:{
            scrollBar(){
                return{
                    x:70,
                    y:330,
                    width:this.width,
                    height:14,
                    fill:"#e1e4e9"
                }
            },
            scrollCenterBar(){

            },
            scrollLeftBtn(){
                let imageObj = new Image()
                imageObj.src = this.imageBtn
                return {
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
                    x:70 + this.width - 22,
                    y:326,
                    image:imageObj,
                    width:22,
                    height:22,
                    crop:{x:0,y:0,width:22,height:22}
                }
            }
        },
        data(){
            return{
                imageBtn:require('@/assets/icon/scrooll-btn.png'),
            }
        },
        props:{
            width:{
                type:Number,
                default:0
            }
        },
        mounted() {
            //console.log(this.width)
        }
    }
</script>

<style scoped>

</style>