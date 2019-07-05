new Swiper('.swiper-container-father', {
  direction: "vertical",
  mousewheel: true,
  on: {
    slideChangeTransitionEnd: function () {
      if (this.activeIndex === 1 && $('.big-img').children().length < 4) {
        $('.big-img').append('<div><img src="./img/index/1-1.png" class="meinv"></div>');
        $('.big-img>div:nth-child(1)>img').addClass('first-img');
        $('.big-img').append('<div><img src="./img/index/1-2.png" class="meinv"></div>');
        $('.big-img>div:nth-child(2)>img').addClass('second-img');
        $('.big-img').append('<div><img src="./img/index/1-3.png" class="meinv"></div>');
        $('.big-img>div:nth-child(3)>img').addClass('third-img');
        $('.big-img').append('<div><img src="./img/index/1-4.png" class="meinv"></div>');
        $('.big-img>div:nth-child(4)>img').addClass('fourth-img');
      }
    },
  }
});
new Swiper('.swiper-container-son', {
  autoplay: {delay: 3500},
  effect: 'fade',
});
let $hideList = $('.hide-list');
$(".icon-caidan1").click(function (e) {
  e.stopPropagation();
  $hideList.show();
  $hideList.animate({
    width: "20rem"
  }, 200)
});
$("body").click(function () {
  $hideList.hide();
  $hideList.width(0);
});
$("#android").click(function () {
  window.open("https://kqsoft.oss-cn-shenzhen.aliyuncs.com/soft/kqapp6.apk")
});
$("#ios").click(function () {
  window.open("https://kqsoft.oss-cn-shenzhen.aliyuncs.com/soft/kqapp6.apk")
});