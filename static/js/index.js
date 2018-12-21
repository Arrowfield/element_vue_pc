$(function () {
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
  //（2）侧边栏的事件
  $('.btn-nav').on('click tap', function () {
    $('.nav-content').toggleClass('showNav hideNav').removeClass('hidden');
    $(this).toggleClass('animated');
  });

  //（4）通过JS控制container的margin-left
  $(window).resize(function () {
    var width = $(".container").innerWidth()
    $(".container").css({
      "margin-left": -width / 2
    });
  })
  //（5）页面切换平滑过渡的JS代码
  //（6）导航悬停显示高亮
  $("#main").on("mouseenter", "LI", function () {
    var height = $(window).innerHeight();
    var i = $(this).index();
    //$(window).scrollTop(i * height); //相对于顶部的偏移量
    $('body,html').animate({
      scrollTop: i * height
    }, 600);
    $(this).css({
      "color": "#00ffff"
    }).siblings().css({
      "color": "white"
    })
    $("#marker").css({
      "transform": `translate(${i*120}px, 0)`
    })
  })
})
//（3）页面入场效果
window.onload = function () {
  setTimeout(function () {
    $(".loading").animate({
      "opacity": 0
    }, "slow", function () {
      $(".loading").hide();
    })
  }, 1500)
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