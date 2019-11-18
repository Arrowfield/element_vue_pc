<template>
    <svg xmlns="http://www.w3.org/2000/svg" x="0" :width="width">
        <line :x1="width" :y1="top" :x2="width" :y2="top + height" stroke="#ACB2BF" stroke-width="2"></line>
    </svg>
</template>

<script>
    /*
    * 暂时不考虑：label的显示
    * 有些数据是不需要公用的
    * */
    export default {
        name: "DataSvgYAxis",
        data(){
            return{}
        },
        computed:{
            width(){
                return this.$store.state.dashboard.axisYWidth
            },
            height(){
                return this.$store.state.dashboard.axisYHeight
            },
            top(){
                return this.$store.state.dashboard.dataAreaTop
            }
        }
    }
</script>

<style scoped>

</style>