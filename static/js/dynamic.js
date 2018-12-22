$(function () {
  $('<link rel="stylesheet" href="./css/header.css">').appendTo("head") //CSS文件
  //使用AJAX加载头部
  $.ajax({
    url: "../sub/header.html",
    type: "GET",
    success: function (result) {
      $(result).replaceAll("header")
      $('<script src="./js/header.js"></script>').appendTo("body") //JS文件
      $(".my-dynamic").css({color:"#00FFFF"})
      $("#marker").css({transform:"translate(360px,0)"})
    },
    error: function (err) {
      console.log(err.statusText)
    }
  })
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