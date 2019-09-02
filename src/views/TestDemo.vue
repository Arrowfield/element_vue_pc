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
            <tbody>
            <tr>
                <td>520</td>
                <td>张三</td>
                <td>优秀</td>
                <td>25</td>
                <td>男</td>
                <td>良好</td>
                <td><button>加入对比</button></td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {}
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
        }

        tr:hover td {
            background: #f5f7fa;
        }
    }

    .compare-panel {
        width: 120px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 40px;
        margin-left: 80px;
        border: 1px solid #ddd;
        margin-top: 10px;
    }
</style>