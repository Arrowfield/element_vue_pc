<template>
    <div class="fl-checkbox">

        <input type="checkbox" v-model="value">
        <label>保持会话</label>
    </div>
</template>
<script>
export default {
    name:"FlCheckbox",
    props:{
        value:{
            type:Boolean
        }
    }    
}
</script>
<style lang='scss' scoped>
    .fl-checkbox{
        text-align: left;
        
        input{
            // width: 0;
            // height:0;
        }
    }
</style>
