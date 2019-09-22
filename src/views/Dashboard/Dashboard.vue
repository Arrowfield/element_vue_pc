<template>
    <div>
        <my-canvas></my-canvas>
        <button @click="handleFilter">操作过滤</button>
    </div>
</template>

<script>

    import data from './table_data_tbody.json'
    import {filterArray} from '@/utils/index'

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
                var obj = {};
                arr = arr.reduce(function (item, next) {
                    obj[next.key] ? '' : obj[next.key] = true && item.push(next);
                    return item;
                }, []);
            },
            handleFilter(obj) {
                this.selected = Object.assign(obj, this.selected)
                this.options = filterArray(this.options, this.array, this.selected)
            }
        },
        mounted() {

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