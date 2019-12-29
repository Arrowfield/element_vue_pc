<template>
	<!--加减商品-->
	<div class="cartControl-wrapper">

		<!--button @click="handleClick">加入购物车</button>

		<div class="compare">加入对比</div>

		<transition
						v-on:before-enter="beforeEnter"
						v-on:enter="enter"
						v-on:after-enter="afterEnter"
		>
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
		</transition-->

		<!--div class="drop">
				<div v-for="(item) in items" class="drop-item" draggable
						 v-on:dragstart="dragStart"
						 v-on:drag="drag"
						 v-on:dragend="dragEnd"
						 v-on:dragenter="dragEnter"
						 v-on:dragover="dragOver"
						 v-on:drop="drop"
				>{{ item.num }}
				</div>

				<div class="drop-item" draggable
						 v-on:dragstart="dragStart"
						 v-on:drag="drag"
						 v-on:dragend="dragEnd"
						 v-on:dragenter="dragEnter"
						 v-on:dragover="dragOver"
						 v-on:drop="drop"
				>2
				</div>
				<div class="drop-item" draggable
						 v-on:dragstart="dragStart"
						 v-on:drag="drag"
						 v-on:dragend="dragEnd"
						 v-on:dragenter="dragEnter"
						 v-on:dragover="dragOver"
						 v-on:drop="drop"
				>3
				</div>
				<div class="drop-item" draggable
						 v-on:dragstart="dragStart"
						 v-on:drag="drag"
						 v-on:dragend="dragEnd"
						 v-on:dragenter="dragEnter"
						 v-on:dragover="dragOver"
						 v-on:drop="drop"
				>4
				</div>
		</div-->

		<!--        <div id="move" class="move-item"></div>-->

		<!--        <div-->
		<!--             @dragover="handleImageOver"-->
		<!--             @dragenter="handleImage"-->
		<!--             @drop="handleImageDrop"-->
		<!--             @click="handleUpload" class="dragImage">+-->
		<!--        </div>-->
		<!--        <input hidden type="file" name="file" @change="handleChange" accept="image/*">-->
		<!--        <div class="image-parent">-->
		<!--            <img src="" alt="" id="showImage">-->
		<!--        </div>-->
	</div>
</template>
<script>
  import CartControl from './CartControl'
  import ShopCart from './ShopCart'


  export default {
    data() {
      return {
        flag: false,
        dom: "",
        domElse: "",
        items: [{num: 1}, {num: 2}, {num: 3}, {num: 4}]
      }
    },
    components: {},
    methods: {
      handleChange(e) {
        var file = e.target.files[0]
        console.log(file)
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (e) {
          var img = document.getElementById('showImage')
          img.src = e.target.result
        }
      },
      handleUpload() {
        var dom = document.getElementsByTagName('input')[0]
        dom.click()
      },
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
        let x, y
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
      },
      dragStart(el) {
        console.log('dragstart...')
        //el.target.style.borderRight = "1px solid #ddd"
        this.dom = el.target.innerHTML
      },
      drag(el) {
        //el.target.style.borderRight = "1px solid #ddd"
      },
      dragEnd(el) {

        console.log('dragend...')
        if (el.target.innerHTML != 4) {
          //el.target.style.borderRight = "none"
        }
        //当源对象进入目标对象的宽度超过一伴是就进行交换
        console.log(this.dom, this.domElse)

        //如果在外部进行放下时
        if (this.domElse) {
          el.target.innerHTML = this.domElse
        }
        this.domElse = ""
      },

      //目标
      dragEnter(el) {
        console.log('dragEnter...')
      },
      dragOver(el) {
        el.preventDefault()
        console.log('dragOver...')
      },
      drop(el) {

        console.log('drop...')
        this.domElse = el.target.innerHTML
        el.target.innerHTML = this.dom


      },
      mouseDown(evR) {


      },
      handleImage(el) {

        el.target.style.border = "1px solid red"
      },
      handleImageOver(el) {
        el.preventDefault()
        console.log('image over')
      },
      handleImageDrop(el) {

        el.preventDefault()
        var file = el.dataTransfer.files[0]
        //
        el.target.style.border = "1px solid #ddd"
        // console.log("image drop")
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (e) {
          var img = document.getElementById('showImage')
          img.src = e.target.result
        }
      },
      getScrollOffsets(w) {
        w = w || window
        if (w.pageXOffset != null)

          return {
            x: w.pageXOffset,
            y: w.pageYOffset
          }
        var d = w.document
        if (document.compatMode == "CSS1Compat")
          return {
            x: d.documentElement.srcollLeft,
            y: d.documentElement.srcollTop
          }
        return {
          x: d.body.srcollLeft,
          y: d.body.srcollTop
        }
      }

      //滚动事件
    },
    mounted() {
      var dom = document.getElementById('move')

      //dom.addEventListener('mousedown', drag)
      //document.addEventListener('mousemove', drag)
      //document.addEventListener('mouseup', drag)

      let toggle = false
      let mouseX, mouseY, offsetX, offsetY

      let _that = this

      function drag(ev) {
        ev.preventDefault()

        let type = ev.type
        switch (type) {
          case 'mousedown' :
            var scroll = _that.getScrollOffsets()
            toggle = true
            //获取鼠标当前位置
            mouseX = ev.clientX + scroll.x, mouseY = ev.clientY + scroll.y
            //获取元素的偏移量
            offsetX = dom.offsetLeft, offsetY = dom.offsetTop

            break;
          case "mousemove" :
            if (toggle) {
              var scroll = _that.getScrollOffsets()
              var x1 = ev.clientX + scroll.x, y1 = ev.clientY + scroll.x
              var nowX = offsetX + x1 - mouseX, nowY = offsetY + y1 - mouseY

              dom.style.left = nowX + 'px'
              dom.style.top = nowY + 'px'
            }
            break;
          case "mouseup":
            toggle = false
            //document.removeEventListener('mousemove',drag)
            //document.removeEventListener('mouseup',drag)

            break;
        }
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

	table {
		table-layout: fixed;
		width: 600px;
		position: fixed;
		top: 400px;
		right: 500px;

		th, td {
			padding: 10px 0;
			text-align: center;
			border-bottom: 1px solid #ddd;
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

	.drop {
		width: 1200px;
		margin: 50px auto;
		display: flex;

		.drop-item {
			width: 25%;
			border: 1px solid red;
			/*border-right: 0;*/
			height: 300px;
			line-height: 300px;
			font-size: 80px;
			text-align: center;

			&:last-child {
				/*border-right: 1px solid #ddd;*/
			}
		}
	}

	.move-item {
		width: 200px;
		height: 200px;
		position: absolute;
		top: 500px;
		left: 500px;
		background: bisque;
		cursor: pointer;
	}

	.image-parent {
		padding: 10px;
	}

	.dragImage {
		width: 120px;
		height: 120px;
		font-size: 50px;
		color: #333;
		line-height: 120px;
		text-align: center;
		border: 1px dotted #ddd;
		margin: 50px;
		cursor: pointer;
	}
</style>