<template>
    <button @click="handleClick"><slot></slot></button>
</template>

<script>
export default {
    name:"FlButton",
    componentName:"FlButton",
    methods:{
        handleClick(evt){
            this.$emit('click',evt)
        }
    }
}
</script>
<style src="./button.scss" lang="scss" scoped></style>