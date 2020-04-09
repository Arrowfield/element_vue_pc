export default  {
  home:{name: '后台首页', path: '/home', icon: ''},
  system:{
    name: '系统管理', icon: '',
    children:{
      name: '角色管理', path: '/home/system/role',icon:"",
      name: '图标管理', path: '/home/system/icon',icon:""
    }
  },
  article = { name:"文章",path:"",icon:"" },
  comment = { name:"评论管理",path:"",icon:"" },
  tool = { name:"工具",path:"",icon:"" },
  about = { name:"关于",path:"",icon:"" }
}
