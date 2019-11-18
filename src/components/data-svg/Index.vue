<template>
    <svg class="data-svg-top" xmlns="http://www.w3.org/2000/svg" >
        <DataSvgYAxis></DataSvgYAxis>
        <DataSvgXAxis></DataSvgXAxis>
    </svg>
</template>

<script>
    import DataSvgYAxis from './DataSvgYAxis'
    import DataSvgXAxis from './DataSvgXAxis'
    export default {
        name: "Index",
        components:{
            DataSvgYAxis,DataSvgXAxis
        },
        computed:{
            width(){
                return this.$store.state.dashboard.width
            }
        }
    }
</script>

<style scoped>
    .data-svg-top{
        width:100%;
        height: 400px;
    }
</style>