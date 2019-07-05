$(function () {
  $(".intro>ul").on("click", "LI", function () {
    var i = $(this).index()
    $("#show").children(`#show>div:nth-child(${i + 1})`).fadeIn(2000).siblings("#show>div:not(.paging)").css({
      "display": "none"
    })
  })
})

//分页
function getPage() {
  var data = [
    '北京',
    '上海',
    '广州',
    '深圳',
    '杭州',
    '长沙',
    '合肥',
    '宁夏',
    '成都',
    '西安',
    '南昌',
    '上饶',
    '沈阳',
    '济南',
    '厦门',
    '福州',
    '九江',
    '宜春',
    '赣州',
    '宁波',
    '绍兴',
    '无锡',
    '苏州',
    '徐州',
    '东莞',
    '佛山',
    '中山',
    '成都',
    '武汉',
    '青岛',
    '天津',
    '重庆',
    '南京',
    '九江',
    '香港',
    '澳门',
    '台北'
  ];
  var nums = 5;
  var pages = Math.ceil(data.length / nums);
  var thisDate = function (curr) {
    var str = '',
      last = curr * nums - 1;
    last = last >= data.length ? (data.length - 1) : last;
    for (var i = (curr * nums - nums); i <= last; i++) {
      // str += '<li>' + data[i] + '</li>';
    }
    return str;
  };
  //调用分页
  laypage({
    cont: 'biuuu_city',
    pages: pages,
    jump: function (obj) {
      document.getElementById('biuuu_city_list').innerHTML = thisDate(obj.curr);
    }
  })
}

getPage()
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