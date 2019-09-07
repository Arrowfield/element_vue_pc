<template>
    <!--加减商品-->
    <div class="cartControl-wrapper">
        <button @click="handleClick">加入购物车</button>

        <div class="compare">加入对比</div>

        <transition
                v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:after-enter="afterEnter"
        >
            <!--            <div-->
            <!--                    v-if="flag" class="ball">-->
            <!--            </div>-->
            <table v-if="flag" cellspacing="0" cellpadding="0">
                <thead>
                <tr>
                    <th width="50">ID</th>
                    <th width="50">姓名</th>
                    <th width="50">年龄</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>250</td>
                    <td>张三</td>
                    <td>20</td>
                </tr>
                </tbody>
            </table>
        </transition>
    </div>
</template>
<script>
    import CartControl from './CartControl'
    import ShopCart from './ShopCart'

    export default {
        data() {
            return {
                flag: false
            }
        },
        components: {},
        methods: {
            handleClick() {
                this.flag = !this.flag
            },
            beforeEnter(el) {
                el.style.transform = "translate(0,0) scale(1)"
                el.style.opacity = 1
            },
            enter(el, done) {
                el.offsetWidth
                el.style.transition = "all 3s ease"
                let x,y
                let dom = document.getElementsByClassName('compare')[0]
                let right1 = dom.getBoundingClientRect().right
                let right2 = el.getBoundingClientRect().right
                let top1 = dom.getBoundingClientRect().top
                let top2 = el.getBoundingClientRect().top

                x = right1 - right2 - dom.offsetWidth / 2 + el.offsetWidth / 2
                y = top2 - top1 + el.offsetHeight / 2 - dom.offsetHeight / 2
                //console.log(x)
                el.style.transform = `translate(${x}px,-${y}px) scale(.2)`
                el.style.opacity = .4
               done()
                //默认以中心为原点
            },
            afterEnter(el) {
                this.flag = !this.flag
            }
        }
    }
</script>
<style lang="scss" scoped>
    .ball {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: red;
    }

    table{
        table-layout: fixed;
        width:600px;
        position: fixed;
        top:400px;
        right:500px;
        th,td{
            padding:10px 0;
            text-align: center;
            border-bottom:1px solid #ddd;
        }
    }

    .compare {
        width: 120px;
        height: 30px;
        border-radius: 30px;
        text-align: center;
        line-height: 30px;
        background: #3c8dbc;
        position: fixed;
        top: 0;
        right: 120px;
        color: white;
    }
</style>