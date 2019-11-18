<template>
    <svg xmlns="http://www.w3.org/2000/svg" x="0" :width="width">

    </svg>
</template>

<script>
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