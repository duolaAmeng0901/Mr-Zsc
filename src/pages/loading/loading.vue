<template>
  <div id="loading-wrapper">
    <div class="container" @keyup.13="toLogin">
        <div class="col">
          <ul id="skill">
            <em>You are right!!!!</em>
            <li><span class="expand html5"></span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loading',
    created () {
      setTimeout(() => {
        this.$router.replace('/login');
      }, 2000)
    }
  }
</script>

<style scoped>
  #loading-wrapper {
    width: 100%;
  }
  .container{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  .col {
    width:500px;
  }

  #skill {
    width:90%;
    list-style:none;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
  }

  #skill li {
    margin-bottom:70px;
    background:#000;
    height:5px;
    border-radius:3px;
    border-left:1px solid #111;
    border-top:1px solid #111;
    border-right:1px solid #333;
    border-bottom:1px solid #333;
  }

  #skill em {
    display: block;
    text-align: center;
  }

  .expand {
    height:1px;
    margin:2px 0;
    background:#2187e7;
    position:absolute;
    box-shadow:0px 0px 10px 1px rgba(0,198,255,0.4);
  }

  .html5 {
    width:88%;
    -moz-animation:html5 2s ease-out;
    -webkit-animation:html5 2s ease-out;
  }

  @-moz-keyframes html5 {
    0%  { width:0px;}
    100%{ width:88%;}
  }


  @-webkit-keyframes html5 {
    0%  { width:0px;}
    100%{ width:88%;}
  }


</style>
<style>
