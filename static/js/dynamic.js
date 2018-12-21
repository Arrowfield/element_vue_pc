$(function () {
  $('<link rel="stylesheet" href="./css/header.css">').appendTo("head")//CSS文件
  //使用AJAX加载头部
  $.ajax({
    url:"../sub/header.html",
    type:"GET",
    success:function(result){
      $(result).replaceAll("header")
      $('<script src="./js/header.js"></script>').appendTo("body")//JS文件
    },
    error:function(err){
      console.log(err.statusText)
    }
  })
})