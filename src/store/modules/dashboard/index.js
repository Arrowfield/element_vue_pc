const state = {
    canvasConfig:{
        width:800,
        height:600,
    }
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
