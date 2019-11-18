
const DATA_SVG_WIDTH = 1640
const DATA_SVG_SELECT = 240   //框选区域的最大是高度
const DATA_SVG_TOP = 60       //框选区域距离顶部的距离

const state = {
    width:1600,      //定义svg图形的标准宽度
    axisYWidth:70,   //定义svg图表中纵坐标的标准宽度
    axisYHeight:240,  //定义框选区域的最大是高度
    dataAreaTop:60
}

const getters = {
    dataAreaWidth : state => {
        return state.width - 2 * state.axisYWidth
    }
}

const mutations = {
    setWidth(state,val){

    }
}

export default {
    state,
    getters,
    mutations
}
