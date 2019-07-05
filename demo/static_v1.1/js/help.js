$(".icon-caidan1").click(function (e) {
  e.stopPropagation();
  $(".hide-list").show();
  $(".hide-list").animate({
    width: "20rem"
  }, 200)
})
$("#right").click(function (e) {
  //e.stopPropagation();
  $(".hide-list").hide();
  $(".hide-list").width(0);
})
$("ul.one>li>span").click(function () {
  var i = $(this).parent().index();
  $(`#right>div:nth-child(${i + 1})`).show().siblings().hide();
  if ($(this).next("ul.two").is(":hidden")) {
    $(this).next("ul.two").show()
  } else {
    $(this).next("ul.two").hide()
  }
  $(this).parent().siblings().children("ul.two").hide()
})
$('.help>li:not(:nth-child(1))>span').click(function(){
  var i = $(this).parent().index();
  $(`#right>div:nth-child(${i})`).show().siblings().hide();
  if ($(this).next("ul.two").is(":hidden")) {
    $(this).next("ul.two").show()
  } else {
    $(this).next("ul.two").hide()
  }
})