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
$("#main").on("click", "LI", function () {
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
  $(this).children("a").css({color:"#00ffff"});
  $(this).siblings().children("a").css({color:"white"});
  //console.log($(this))
  $("#marker").css({
    "transform": `translate(${i*120}px, 0)`
  })
})