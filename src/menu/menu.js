let menu = {}
menu.home = {name: '后台首页', path: '/home', icon: ''}
menu.system = {name: '系统管理', icon: ''}
menu.system.children = [
  {name: '角色管理', path: '/home/system/role',icon:""},
  {name: '图标管理', path: '/home/system/icon',icon:""},
]
menu.article = { name:"文章",path:"",icon:"" }
menu.comment = { name:"评论管理",path:"",icon:"" }
menu.tool = { name:"工具",path:"",icon:"" }
menu.about = { name:"关于",path:"",icon:"" }

export default menu
