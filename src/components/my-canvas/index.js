import MyCanvas from './src/my-canvas'

MyCanvas.install = function(Vue){
    Vue.component(MyCanvas.name,MyCanvas)
}

export default MyCanvas