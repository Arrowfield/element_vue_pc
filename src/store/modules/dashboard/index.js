const state = {
    canvasConfig:{
        width:0,
        height:0,
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
