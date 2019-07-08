let menu = {}
menu.home = {name: '首页', path: '/home', icon: 'fa fa-tachometer'}

menu.system = {name: '系统管理', icon: 'fa fa-tachometer'}
menu.system.children = [
  {name: '角色管理', path: '/home/system/role'}
]

export default menu
