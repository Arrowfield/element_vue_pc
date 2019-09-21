<template>
    <div>
        <my-canvas></my-canvas>
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