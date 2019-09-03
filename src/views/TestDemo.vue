<template>
    <div>
        <div class="compare-panel">对比</div>
        <table cellpadding="0" cellspacing="0">
            <thead>
            <tr>
                <th width="80">ID</th>
                <th width="120">名称</th>
                <th width="250">指标</th>
                <th width="260">年龄/Age</th>
                <th width="80">性别</th>
                <th width="80">性能</th>
                <th width="120">操作</th>
            </tr>
            </thead>
            <transition-group name="list-compare" tag="tbody">
                <tr class="list-compare-item" v-for="(item,index) in list" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.target }}</td>
                    <td>{{ item.age }}</td>
                    <td>{{ item.sex }}</td>
                    <td>{{ item.property }}</td>
                    <td>
                        <button class="btn-primary" @click="addCompare($event,index)">加入对比</button>
                    </td>
                </tr>
            </transition-group>
        </table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                flag: true,
                list: [
                    {id: "250", name: "张三", target: "优秀", age: 25, sex: "男", property: "良"},
                    {id: "251", name: "李四", target: "良", age: 25, sex: "女", property: "良"}
                ]
            }
        },
        methods: {
            addCompare(el,index) {
                //this.list.splice(index+1,0,this.list[index])

                let parent = el.target
                console.log(parent)
                while (parent.tagName !== "TR"){
                    parent = parent.parentNode
                }
                let obj = parent.getBoundingClientRect()
                console.log(obj)
                this.list.splice(index,1)
            },
            leave(el,done){
                // console.log(el)
                // done()
            }
        }
    }
</script>

<style lang="scss" scoped>
    table {
        text-align: left;
        position: fixed;
        top: 280px;
        left: 80px;

        th {
            height: 0;
            font-size: 0;
        }

        td {
            border-bottom: 1px solid #ddd;
            height: 40px;
            padding: 0 10px;
            vertical-align: middle;

            .btn-primary {
                background: #409eff;
                color: white;
                border-radius: 4px;
                border: none;
                padding: 6px;
                cursor: pointer;

                &:hover {
                    background: #66b1ff;
                }
            }
        }

        tr:hover td {
            background: #f5f7fa;
        }
    }

    .compare-panel {
        width: 120px;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        text-align: center;
        border-radius: 40px;
        margin-left: 80px;
        /*border: 1px solid #ddd;*/
        margin-top: 10px;
        background: #409eff;
        color: white;

        &:hover {
            background: #66b1ff;
        }
    }

    .list-compare-item{
        transition: all 1s;
    }
    .list-compare-leave-to{
        opacity: 0;
        transform: translate(60px,-260px) ;

    }

    //x = 60
    //y - 20
</style>