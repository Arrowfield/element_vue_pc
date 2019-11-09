<template>
  <div id="app">
    <router-view name="login"></router-view>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }

  body,html {
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  body {
    font-size: 13px;
    font-family: 'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif;
    font-weight:400;
    color:#999;
  }
/*
  移动端：
  DPR = 设备像素/CSS像素
  android 1 css像素 360 GalaxyS5
  iphone6/7/8 2 css像素 375
  iphone8 3 css像素 375
  PC端：
  媒体查询至少适应这三种
  web常见尺寸： 1366 * 768
  大网页：1920 * 1080
  最小尺寸：1024 * 768
*/
  html{
    font-size: 100px;
  }
  @media screen and (max-width:1700px) {
    html{
      font-size:83px
    }
  }

  @media screen and (max-width:1400px){
    html{
      font-size:73px
    }
  }
  @media screen and (max-width:1200px){
    html{
      font-size:60px
    }
  }

</style>


