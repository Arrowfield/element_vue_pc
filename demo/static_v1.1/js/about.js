$(".icon-caidan1").click(function (e) {
  e.stopPropagation();
  $(".hide-list").show();
  $(".hide-list").animate({
    width: "20rem"
  }, 200)
})
$("body").click(function () {
  $(".hide-list").hide();
  $(".hide-list").width(0);
})