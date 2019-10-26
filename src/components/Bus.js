import Vue from 'vue'

export default  new Vue({
    data(){
        return{
            name:"zhangsan",
            axisRect:[],//存储每个矩形对象的坐标x，y
            axisLine:[],//存储每个线段对象的x，y
        }
    },
    methods:{
        isInRect(timeStamp){
            return timeStamp
        }
    }
})