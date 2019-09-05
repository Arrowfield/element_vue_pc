<template>
    <div class="ball-container">
        <div v-for="(ball,index) of balls" :key="index">
            <transition @before-enter="handleBeforeEnter" @enter="handleEnter" @after-enter="handleAfterEnter">
                <div class="ball" v-show="ball.show" v-bind:css="false">
                    <!--外层盒子-->
                    <div class="inner inner-hook"></div>
                    <!--内层盒子-->
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
    export default {

        data() {
            return { // 使用balls存放5个小球，这些小球的默认状态都是不显示的
                balls: [{
                    show: false
                }, {
                    show: false
                }, {
                    show: false
                }, {
                    show: false
                }, {
                    show: false
                }],
                dropBalls: [] // 用dropBalls来存放掉落的小球
            }
        },
        methods: {
            drop(el) {
                console.log(el)
                for (let i = 0; i < this.balls.length; i++) { // 遍历这5个小球
                    let ball = this.balls[i]
                    if (!ball.show) { // 当小球显示状态为隐藏时
                        ball.show = true // 将这个小球的显示状态设置为true
                        ball.el = el // 将cartControl传过来的对象挂载到ball的el属性上
                        this.dropBalls.push(ball) // 将这个小球放入到dropBalls数组中
                        return
                    }
                    
                }
                console.log(this.dropBalls)

            },

            // js动画钩子
            // beforeenter
            handleBeforeEnter: function (el) {
                let count = this.balls.length
                while (count--) {
                    let ball = this.balls[count]
                    if (ball.show) {
                        let rect = ball.el
                        .getBoundingClientRect() // getBoundingClientRect()获取小球相对于视窗的位置，屏幕左上角坐标为0，0
                        let x = rect.left - 32 // 小球x方向位移= 小球距离屏幕左侧的距离-外层盒子距离水平的距离
                        let y = -(window.innerHeight - rect.top - 22) // 负数，因为是从左上角向下
                        el.style.display = ''
                        el.style.webkitTransform = `translate3d(0,${y}px,0)` // 设置外层盒子，即小球垂直方向的位移
                        el.style.transform = `translate3d(0,${y}px,0)`
                        let inner = el.getElementsByClassName('inner-hook')[0]
                        inner.style.webkitTransform = `translate3d(${x}px,0,0)` // 设置内层盒子，即小球水平方向的距离
                        inner.style.transform = `translate3d(${x}px,0,0)`
                    }
                }
            },
            // enter
            handleEnter: function (el, done) {
                /* eslint-disable no-unused-vars */
                // 触发浏览器重绘
                let rf = el.offsetHeight
                this.$nextTick(() => { // 让动画效果异步执行,提高性能
                    el.style.webkitTransform = 'translate3d(0, 0, 0)' // 设置小球掉落后最终的位置
                    el.style.transform = 'translate3d(0, 0, 0)'
                    let inner = el.getElementsByClassName('inner-hook')[0]
                    inner.style.webkitTransform = 'translate3d(0, 0, 0)'
                    inner.style.transform = 'translate3d(0, 0, 0)'
                    el.addEventListener('transitionend',
                        done) // Vue为了知道过渡的完成，必须设置相应的事件监听器。它可以是transitionend或 animationend
                })
            },
            handleAfterEnter: function (el) {
                let ball = this.dropBalls.shift() // 完成一次动画就删除一个dropBalls的小球
                if (ball) {
                    ball.show = false
                    el.style.display = 'none'
                }

            }
        }
    }
</script>

<style>
    .ball{
        width:20px;
        height:20px;
        border-radius: 50%;
        background: blue;
    }
</style>