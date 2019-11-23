<template>
    <label class="fl-radio">
        <span class="fl-radio__input" :class="{'is-checked' : model === label}">
            <span class="fl-radio__inner"></span>
            <input class="fl-radio__original"
                   type="radio" ref="radio"
                   v-model="model"
                   @change="handleChange"
            >
        </span>
        <span class="fl-radio__label" ><!--@keydown.stop-->
            <slot></slot>
        </span>
    </label>
</template>
<script>
    export default {
        name: "fl-radio",
        data() {
            return {}
        },
        props: {
            label: {},
            value: {}
        },
        computed: {
            isGroup() {
                let parent = this.$parent
                while (parent) {
                    if (parent.$options.componentName !== 'FLRadioGroup') {
                        parent = parent.$parent
                    } else {
                        this._radioGroup = parent//向data中添加访问器属性
                        return true
                    }
                }
                return false
            },
            model: {
                get() {

                    return this.isGroup ? this._radioGroup.value : this.value
                },
                set(val) {
                    if (this.isGroup) {
                        //this
                    } else {
                        this.$emit('input', val)
                    }
                    this.$refs.radio && (this.$refs.radio.checked = this.model === this.label)
                }
            }
        },
        methods:{
            handleChange(){
                console.log(123)
            }
        }
    }
</script>
<style lang="scss">
    .fl-radio {
        line-height: 1;
        display: inline-block;
        cursor: pointer;
        margin-right: 30px;

        .fl-radio__input {
            white-space: nowrap;
            vertical-align: middle;
            display: inline-block;
            position: relative;

            .fl-radio__inner {
                display: inline-block;
                border: 1px solid #dcdfe6;
                border-radius: 100%;
                width: 14px;
                height: 14px;
                background-color: #fff;
                position: relative;
                cursor: pointer;
                box-sizing: border-box;

                &:hover{
                    border-color:#409eff;
                }
            }

            .fl-radio__original {
                position: absolute;
                z-index: -1;
                opacity: 0;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
            }
        }

        .fl-radio__label {
            font-size: 14px;
            padding-left: 10px;
        }
    }

    // word-break:normal || break-all ; word-wrap:break-word ;white-space:nowrap
    // input元素点击父元素 就可以出发默认事件【获取焦点】
</style>