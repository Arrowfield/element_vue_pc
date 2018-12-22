$(function () {
  $('<link rel="stylesheet" href="./css/header.css">').appendTo("head")//CSS文件
  //使用AJAX加载头部
  $.ajax({
    url:"../sub/header.html",
    type:"GET",
    success:function(result){
      $(result).replaceAll("header")
      $('<script src="./js/header.js"></script>').appendTo("body")//JS文件
      $(".home").css({color:"#00FFFF"})
    },
    error:function(err){
      console.log(err.statusText)
    }
  })
  //刷新时执行的事件
  var width = $(".container").innerWidth()
  $(".container").css({
    "margin-left": -width / 2
  });
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
  });
})
//（3）页面LOADING入场效果
window.onload = function () {
  setTimeout(function () {
    $(".loading").animate({
      "opacity": 0
    }, "slow", function () {
      $(".loading").hide();
    })
  }, 1000)
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
      } else if ($key > 4) { //当sections的数量为n时这里的$key的值是n+1
        $key = 3;
        canscroll = true;
        return;
      }
      $('body,html').stop().animate({
        'scrollTop': $('.main-box>div').eq($key).offset().top
      }, 1000, function () {
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