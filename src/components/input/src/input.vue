<template>
    <div :class="[
        type === 'textarea' ? 'fl-textarea' :'el-input',
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
    >
      
        <template v-if="type !== 'textarea'">
            <div class=""></div>
        </template>
    </div>
</template>
<script>
    export default {
        name: "FlInput",
        data(){
            return{
                hovering:false
            }
        },
        props: {
            type: {
                type:String,
                default:"text"
            }
        }

    }
</script>
<style src="./input.scss" lang="scss" scroped></style>