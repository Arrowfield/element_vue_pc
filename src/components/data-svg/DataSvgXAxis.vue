<template>
    <svg xmlns="http://www.w3.org/2000/svg" x="0" :width="width">
<!--        <line :x1="width" :y1="top" :x2="width" :y2="top + height" stroke="#ACB2BF" stroke-width="2"></line>-->
    </svg>
</template>

<script>
    export default {
        name: "DataSvgXAxis",
        data(){
            return{}
        },
        computed:{
            width(){
                return this.$store.getters.dataAreaWidth
            }
        }
    }
</script>

<style scoped>

</style>