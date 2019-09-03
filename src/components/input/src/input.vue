<template>
    <div :class="['fl-input',focus ? 'fl-input-focus':'']">
        <i :class="['iconfont', 'icon'+icon]"></i>
        <input ref="input" 
            :value="value" 
            @focus="focus = true" 
            @blur="focus = false" 
            :type="type" 
            :placeholder="placeholder" 
            v-bind="$attrs"
            @input="$emit('input',$event.target.value)"
            v-focus />
    </div>
</template>
<script>
    export default {
        name: "FlInput",
        data() {
            return {
                hovering: false,
                focus: false
            }
        },
        props: {
            value: {
                type:[String, Number],
            },
            type: {
                type: String,
                default: "text"
            },
            placeholder: {
                type: String,
                default: ""
            },
            icon: {
                type: String
            }
        },
        directives: {
            focus: {
                inserted: function (el) {
                    //console.log(el)
                }
            }
        },
        methods: {
            setNativeInputValue() {
                const input = this.getInput();
                
                if (!input) return;
                if (input.value === this.nativeInputValue) return;
                input.value = this.nativeInputValue;
            },
            getInput() {
                return this.$refs.input || this.$refs.textarea;
            },
        },
        mounted() {
            //this.setNativeInputValue()
        }

    }
</script>
<style src="./input.scss" lang="scss" scroped></style>
<!--
    #### 组件封装 
    + 为什么子组件绑定v-model就可以进行数据的双向绑定
    + 
-->