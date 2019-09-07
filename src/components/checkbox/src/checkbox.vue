<template>
    <div class="fl-checkbox">

        <input  type="checkbox" :checked="checked" @change="$emit('change',$event.target.checked)">
<!--        <div class="fl-checkbox-icon"></div>-->
        <label>保持会话</label>
    </div>
</template>
<script>
export default {
    name:"FlCheckbox",
    model: {
        prop: 'checked',
        event: 'change'
    },
    props:{
        value:{
            type:Boolean
        },
        checked:Boolean
    }    
}
</script>
<style lang='scss' scoped>
    .fl-checkbox{
        text-align: left;
        /*display: flex;*/
        /*align-items: center;*/
        .fl-checkbox-icon{
            width:16px;
            height:17px;
            background: url('../../../assets/icon/checkbox.png') no-repeat;
            background-position: -16px .5px;
            margin-right: 5px;
        }
        input{
            // width: 0;
            // height:0;
        }
    }
</style>
