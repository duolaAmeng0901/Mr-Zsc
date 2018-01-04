<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import vLoading from './pages/loading/loading.vue'
  import router from './router/index.js'

  export default {
    name: 'app',
    router
  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  #app{
    width: 100vw;
    height: 100vh;
  }
</style>
