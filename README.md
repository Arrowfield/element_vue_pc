
## 目录结构介绍 

#### 项目总结

+ 1、Vue的版本使用的2.6.6,element-ui版本2.10,vue-cli的版本3.8
+ 2、数据可视化
+ 3、使用.env.local
```
UI_BASE_URL=dev.admin.com
# SERVER_BASE_URL=http://127.0.0.1:5000
# dev product
VUE_APP_URL=http://127.0.0.1:5000
```

#### 描述下自己的文件目录结构以及文件命令风格

+ 1.idea 打开webstorm配置文件
+ 2.node_modules 项目的依赖包 -save -save-dev
+ 3.public 放置主入口文件index.html 部分资源无法通过import/require导入，需要放置在该目录下如icon、iframe中的src资源
+ 4.src 所有的vue相关的目录都在此处
+ 5.assets 放置些静态资源，如图片，图片命名xx_xx.png
+ 6.组件的命名：Pascal 命名法
+ 7.类的命名：Pascal 命名法
+ 8.方法以及普通变量的命名：半驼峰命名法
+ 9.样式类的命名：xx-xx
+ 10.普通文件的命名：xx或者xx-xx
+ 模块命名还是使用Camel 命名法
