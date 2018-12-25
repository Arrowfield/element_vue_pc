$(function () {
  //CSS文件
  $('<link rel="stylesheet" href="./css/header.css">').appendTo("head")
  //使用AJAX加载头部
  $.ajax({
    url: "../sub/header.html",
    type: "GET",
    success: function (result) {
      $(result).replaceAll("header")
      //刷新时执行的事件
      var width = $(".container").innerWidth()
      $(".container").css({
        "margin-left": -width / 2,
      });
      $('<script src="./js/header.js"></script>').appendTo("body") //JS文件
      $(".home").css({
        color: "#00FFFF"
      })
    },
    error: function (err) {
      console.log(err.statusText)
    }
  })
  //（1）轮播的事件
  var swiper = new Swiper('.swiper-container', {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })
  //（2）轮播切换
  var moved = 0;
  $(".car-next").click(function () {
    var w = $('body,html').width()
    if (moved == 2) {
      $(this).prop("disabled", true)
      return;
    }
    moved++;
    $(".car-prev").removeAttr("disabled")
    $('.my-carousel').css({
      marginLeft: -w * moved
    })
  })
  $(".car-prev").click(function () {
    var w = $('body,html').width()
    if (moved == 0) {
      $(this).prop("disabled", true)
      return;
    }
    moved--;
    $(".car-next").removeAttr("disabled")
    $('.my-carousel').css({
      marginLeft: -w * moved
    })
  })
  //（3）轮播切换
})
//（3）页面LOADING入场效果
window.onload = function () {
  $(".loading").animate({
    "opacity": 0
  }, "slow", function () {
    $(".loading").hide();
  })
}
//（4）页面切换的平滑过渡（使用的是鼠标滚动事件）
var $key = 0;
$(document).ready(function () {
  var canscroll = true;
  changeSize();
  $(window).on('resize', function (event) {
    event.preventDefault();
    changeSize();
  });
  $(document).mousewheel(function (event, delta) {
    if (canscroll) {
      canscroll = false;
      $key -= delta;
      if ($key < 0) {
        $key = 0;
        canscroll = false;
      } else if ($key > 5) { //当sections的数量为n时这里的$key的值是n-1
        $key = 4;
        canscroll = true;
        return;
      }
      $('body,html').stop().animate({
        'scrollTop': $('.main-box>div').eq($key).offset().top
      }, 400, function () {
        canscroll = true;
      })
    }
  })
})
//定义函数动态改变页面大小
function changeSize() {
  var window_height = $(window).height();
  $('.main-box>div').css('height', window_height)
  $('body,html').stop().animate({
    'scrollTop': $('.main-box>div').eq($key).offset().top
  }, 1000, function () {
    canscroll = true;
  })
}
//（5）监听鼠标滚动事件
$(document).on('mousewheel DOMMouseScroll', onMouseScroll);

function onMouseScroll(e) {
  e.preventDefault();
  var wheel = e.originalEvent.wheelDelta || -e.originalEvent.detail;
  var delta = Math.max(-1, Math.min(1, wheel));
  var heightD = $('body,html').height();
  var height = $('body,html').scrollTop()
  if (delta < 0) { //向下滚动
    //获取当前的滚动条的高度
    if (height == 0) {
      $('.down>li').fadeIn(3000) //文字
      $('.my-phone').animate({
        opacity: 1,
        marginLeft: 0
      }, 1000)
      //滑动高亮
      changeMarsk(1,"+")
    } else if (height == heightD) {
      $(".d-flex").animate({
        marginTop: 0
      }, 1000)
      //滑动高亮
      changeMarsk(2,"+")
    } else if (height == 2 * heightD) {
      //滑动高亮
      changeMarsk(3,"+")
    } else if (height == 3 * heightD) {
      //滑动高亮
      changeMarsk(4,"+")
    } else if (height == 4 * heightD) {
      //滑动高亮
      changeMarsk(5,"+")
    }
  } else { //向上滚动
    //滑动高亮
    switch(height){
      case 0: changeMarsk(0); break;
      case heightD: changeMarsk(0,"-"); break; 
      case 2 * heightD: changeMarsk(1,"+"); break; 
      case 3 * heightD: changeMarsk(2,"+"); break; 
      case 4 * heightD: changeMarsk(3,"+"); break;
      case 5 * heightD: changeMarsk(4,"+"); break;
      default:return;
    }
  }
  //鼠标悬停在my-intro上
  $(".my-intro").hover(function () {
    $(this).prev("p.my-mark").css({
      width: "8rem"
    })
  }, function () {
    $(this).prev("p.my-mark").css({
      width: 0
    })
  })
  //偏移调用的方法
  function changeMarsk(i,f) {
    $(`#main>li:nth-child(${i+1})`).children("a").css({color:"#00ffff"})
    $(`#main>li:nth-child(${i+1})`).siblings("li").children("a").css({color:"white"})
    $("#marker").css({
      "transform": `translate(${f}${i*120}px, 0)`
    })
  }
}