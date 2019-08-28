import FlButton from './src/button'

FlButton.install = function(Vue){
    Vue.component(FlButton.name,FlButton)
}

export default FlButton

// 只要在index.js里规定了install方法，就可以向其他ui组件库那样，使用Vue.use()来全局使用