<template>
    <div :class="['fl-input',focus ? 'fl-input-focus':'']">
        <i :class="['iconfont', 'icon'+icon]"></i>
        <input 
        @focus="focus = true" 
        @blur="focus = false" 
        :type="type" 
        :placeholder="placeholder"
        v-focus/>
    </div>
</template>
<script>
    export default {
        name: "FlInput",
        data(){
            return{
                hovering:false,
                focus:false
            }
        },
        props: {
            type: {
                type:String,
                default:"text"
            },
            placeholder:{
                type:String,
                default:""
            },
            icon:{
                type:String
            }
        },
        directives:{
            focus:{
                inserted:function(el){
                    //console.log(el)
                }
            }
        }

    }
</script>
<style src="./input.scss" lang="scss" scroped></style>