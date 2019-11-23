<template>
    <div>
        <!-- <button @click="handleFilter" style="margin-top:10px">操作过滤</button>-->
        <!-- <DataSvg/> -->
        <div style="height:50px"></div>
        <fl-radio v-model="radio" lable="1">备选项1</fl-radio>
        <fl-radio v-model="radio" lable="2">备选项2</fl-radio>
        <div class="e-charts">
            <ve-line :data="chartData" :settings="charSet" :extend="charExtend"></ve-line>
        </div>
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
                    columns: ['date', 'reportTime', 'reportCount'],
                    rows: [
                        { 'date': '00:00', 'reportTime': 32371, 'reportCount': 19810 },
                        { 'date': '01:00', 'reportTime': 12328, 'reportCount': 4398 },
                        { 'date': '02:00', 'reportTime': 12328, 'reportCount': 4398 },
                        { 'date': '03:00', 'reportTime': 12328, 'reportCount': 4398 },
                        { 'date': '04:00', 'reportTime': 12328, 'reportCount': 4398 },
                        { 'date': '05:00', 'reportTime': 12328, 'reportCount': 4398 },
                        { 'date': '06:00', 'reportTime': 12328, 'reportCount': 4398 },
                        { 'date': '07:00', 'reportTime': 12328, 'reportCount': 4398 },
                        { 'date': '08:00', 'reportTime': 12328, 'reportCount': 4398 },
                        { 'date': '09:00', 'reportTime': 12328, 'reportCount': 4398 },
                        { 'date': '10:00', 'reportTime': 12328, 'reportCount': 4398 },
                        { 'date': '11:00', 'reportTime': 12328, 'reportCount': 4398 },
                        { 'date': '12:00', 'reportTime': 12328, 'reportCount': 4398 },
                        { 'date': '13:00', 'reportTime': 12328, 'reportCount': 4398 },
                        { 'date': '14:00', 'reportTime': 12328, 'reportCount': 4398 },
                        { 'date': '15:00', 'reportTime': 12328, 'reportCount': 4398 },
                        { 'date': '16:00', 'reportTime': 12328, 'reportCount': 4398 },
                        { 'date': '17:00', 'reportTime': 12328, 'reportCount': 4398 },
                        { 'date': '18:00', 'reportTime': 12328, 'reportCount': 4398 },
                        { 'date': '19:00', 'reportTime': 12328, 'reportCount': 4398 },
                        { 'date': '20:00', 'reportTime': 12328, 'reportCount': 4398 },
                        { 'date': '21:00', 'reportTime': 12328, 'reportCount': 4398 },
                        { 'date': '22:00', 'reportTime': 12328, 'reportCount': 4398 },
                        { 'date': '23:00', 'reportTime': 12328, 'reportCount': 4398 },
                    ]
                },
                charSet:{
                    labelMap:{
                        reportTime:"上传报告时长",
                        reportCount:"上传报告次数",
                        caseCount:"上传用例次数",
                        caseTime:"上传用例时长",
                        time:"时长",
                        count:"数量"
                    },
                    axisSite:{right:['reportTime']},
                    yAxisType:[''],
                    yAxisName:['数量','时长'],

                },//维度 指标
                charExtend:{
                    'xAxis.0.axisLabel.align': 'center',
                    'yAxis.0.nameLocation': "middle",//y轴文本改变颜色
                    'yAxis.1.nameLocation': "middle",
                    // 'yAxis.0.offset': "-20",
                    "yAxis.0.nameGap":"50",
                    "yAxis.1.nameGap":"50",
                    "grid.left":'120',
                    "grid.right":'120'

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
    .e-charts{
        width:16rem;
        margin:0 auto;
    }
</style>