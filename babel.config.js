module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "~theme"
      }
    ]
  ]
}
//用来将es6的代码转化成es5的插件
