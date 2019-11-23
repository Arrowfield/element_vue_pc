<template>
    <div>
        <!-- <button @click="handleFilter" style="margin-top:10px">操作过滤</button>-->
        <!-- <DataSvg/> -->
        <div style="height:50px"></div>
        <fl-radio v-model="radio" lable="1">备选项1</fl-radio>
        <fl-radio v-model="radio" lable="2">备选项2</fl-radio>
        <ve-line :data="chartData" width="1600" ></ve-line>
    </div>
</template>

<script>

    import data from './table_data_tbody.json'
    //import {filterArray} from '@/utils/index'
    import moment from 'moment'
    import DataSvg from '@/components/data-svg/Index'
    import Bus from '@/components/my-canvas/Bus.js'

    export default {
        name: "Dashboard",
        components:{DataSvg},
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
                selected: {},
                radio:'1',
                chartData:{
                    columns: ['日期', '访问用户', '下单用户'],
                    rows: [
                        { '日期': '2018-05-22', '访问用户': 32371, '下单用户': 19810 },
                        { '日期': '2018-05-23', '访问用户': 12328, '下单用户': 4398 },
                        { '日期': '2018-05-24', '访问用户': 92381, '下单用户': 52910 }
                    ]
                }
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
    .data-svg{
        width: 16rem;
        margin:1rem auto 0;
    }
</style>