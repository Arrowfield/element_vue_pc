<template>
    <div>
        <my-canvas></my-canvas>
        <my-canvas></my-canvas>
        <my-canvas></my-canvas>
        <my-canvas></my-canvas>
        <my-canvas></my-canvas>
        <my-canvas></my-canvas>
        <my-canvas></my-canvas>
        <my-canvas></my-canvas>
        <my-canvas></my-canvas>
        <my-canvas></my-canvas>
        <!--        <button @click="handleFilter" style="margin-top:10px">操作过滤</button>-->
        <div v-if="name === 'lisi'">123456789</div>
    </div>
</template>

<script>

    import data from './table_data_tbody.json'
    //import {filterArray} from '@/utils/index'
    import moment from 'moment'
    import Bus from '@/components/Bus'
    export default {
        name: "Dashboard",
        data() {
            return {
                options: {},
                cases: [],
                caseName: "",
                projects: [],
                projectName: "",
                tasks: [],
                taskName: "",
                creators: [],
                creatorName: "",
                selected: {}
            }
        },
        //计算属性【处理基本的逻辑，依赖缓存】
        computed: {
            name(){
                return Bus.$data.name
            }
        },
        //监听属性【data中已经存在】//执行异步操作
        watch: {
            caseName(val) {
                if (val) {
                    this.handleFilter({caseName: val})
                }
            },
            projectName(val) {
                if (val) {
                    this.handleFilter({projectName: val})
                }
            },
            taskName(val) {
                if (val) {
                    this.handleFilter({taskName: val})
                }
            },
            creatorName(val) {
                if (val) {
                    this.handleFilter({creatorName: val})
                }
            }
        },
        methods: {
            handleFocus(type) {
                //console.log(e.target)
                this[type] = ""
            },
            reduceItem(arr) {
                let obj = {};
                arr = arr.reduce(function (item, next) {
                    obj[next.key] ? '' : obj[next.key] = item.push(next);
                    return item;
                }, []);
            },
            handleFilter(obj) {
                this.selected = Object.assign(obj, this.selected)
                this.options = filterArray(this.options, this.array, this.selected)
            },
            handleClick() {

            }
        },
        mounted() {
        }
    }
</script>

<style scoped lang="scss">
    .fl-select {
        display: inline-block;
        margin-left: 30px;
        padding: 10px 0;

        label {
            margin-right: 10px;
        }

        select {
            width: 180px;
        }
    }
</style>