<template>
  <div id="app">
    <router-view name="login"></router-view>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {name: 'app'}
</script>

<style lang="scss">
  *{box-sizing: border-box;}
  body,html{margin:0;padding:0}
</style>
