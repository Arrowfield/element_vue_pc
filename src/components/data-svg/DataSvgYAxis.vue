<template>
    <svg xmlns="http://www.w3.org/2000/svg" x="0" :width="width">
        <line></line>
    </svg>
</template>

<script>
    /*
    * 暂时不考虑：label的显示
    * */
    export default {
        name: "DataSvgYAxis",
        data:{},
        computed:{
            width(){
                return this.$store.state.dashboard.axisYWidth
            }
        }
    }
</script>

<style scoped>

</style>