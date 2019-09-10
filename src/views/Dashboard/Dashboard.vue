<template>
    <div>
        <div class="fl-select">
            <label>用例</label>
            <select name="caseName" v-model="caseName" @focus="handleFocus('caseName')">
                <option value="王者荣耀">王者荣耀</option>
            </select>
        </div>
        <div class="fl-select">
            <label>项目</label>
            <select name="projectName" v-model="projectName" @focus="handleFocus('caseName')">
                <option value="安卓1小时">安卓1小时</option>
                <option value="安卓0.5小时">安卓0.5小时</option>
                <option value="安卓2小时">安卓2小时</option>
                <option value="安卓1小时">安卓1小时</option>
            </select>
        </div>
        <div class="fl-select">
            <label>任务</label>
            <select name="taskName" v-model="taskName" @focus="handleFocus('caseName')">
                <option value="111">111</option>
                <option value="222">222</option>
                <option value="111">111</option>
                <option value="123">123</option>
            </select>
        </div>
        <div class="fl-select">
            <label>创建者</label>
            <select name="creatorName" v-model="creatorName" @focus="handleFocus('caseName')">
                <option value="小蓝">小蓝</option>
                <option value="张三">张三</option>
            </select>
        </div>
    </div>
</template>

<script>

    import data from './table_data_tbody.json'

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
                creatorName: ""
            }
        },
        watch: {
            caseName(val) {
                //console.log(val)
            },
            projectName(val) {
                //console.log(val)
            },
            taskName(val) {
                //console.log(val)
            },
            creatorName(val) {
                //console.log(val)
            }
        },
        methods: {
            handleFocus(type) {
                //console.log(e.target)
                this[type] = ""
            },
            reduceItem(arr) {
                var obj = {};
                arr = arr.reduce(function (item, next) {
                    obj[next.key] ? '' : obj[next.key] = true && item.push(next);
                    return item;
                }, []);
            }
        },
        mounted() {
            console.log(data.data)
            data.data.forEach((item) => {

            })
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