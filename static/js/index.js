//先
$(function(){
  //功能：实现页面切换过渡效果（头部导航 滚动页面自动定位）
})
//先
var $key = 0;
$(document).ready(function(){
  var canscroll = true;
  changeSize();
  $(window).on('resize', function(event) {
		event.preventDefault();
    changeSize();
	});
  $(document).mousewheel(function(event,delta){
    if(canscroll){
      canscroll = false;
      $key -= delta;
      if($key < 0){
        $key = 0;
        canscroll = false;
      }else if($key > 4){//当sections的数量为n时这里的$key的值是n+1
        $key = 3;
        canscroll = true;
        return;
      }
      $('body,html').stop().animate({'scrollTop':$('.main-box>div').eq($key).offset().top},1000,function(){
        canscroll = true;
      })
    }
  })
})
//定义函数动态改变页面大小
function changeSize(){
  var window_height = $(window).height();
  $('.main-box>div').css('height',window_height)
  $('body,html').stop().animate({'scrollTop':$('.main-box>div').eq($key).offset().top},1000,function(){
    canscroll = true;
  })
}