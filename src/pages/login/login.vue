<template>
  <div id="login-wrapper">
    <div id="contain">
      <div class="theme">
        <em>Hello , Welcome back!!</em>
      </div>
      <div class="login-info">
        <input class="info" id="login" type="text" placeholder="手机号/邮箱/用户名" v-model="user">
        <input class="info" id="passeord" type="password" placeholder="密码" v-model="password">　
        <div class="info options">
          <input type="checkbox" id="rem">
          <label for="rem">记住密码</label>
          <div class="sign-up">
            <router-link to="/password" tag="span">忘记密码？</router-link>
            <router-link to="/signup">立即注册</router-link>
          </div>
        </div>
        <div class="button" @click="login">登陆</div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        user: '',
        password: ''
      }
    },
    methods: {
      login () {
        if(!this.user || !this.password) {
          alert('请输入信息');
          return;
        }
        axios.get(`/login?user=${this.user}&password=${this.password}`)
        .then((data) => {
          if(!data.data.result.length) {
            window.alert('密码或账号错误');
            return;
          }
          window.sessionStorage.setItem('user', data.data.result[0].user);
          window.sessionStorage.setItem('name', data.data.result[0].name);
          if(data.data.result[0].user === 'admin'){
            this.$router.push('/info');
          }else{
            this.$router.push('/buy');
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  #login-wrapper{
    width: 100vw;
    height: 100vh;
    background-image: url('../../assets/login/login.jpg');
    background-size: 100% 100%;
    opacity: .8;
    #contain{
      position: relative;
      width: 100%;
      height: 100%;
      .theme{
        position: absolute;
        top: 200px;
        right: 0;
        left: 0;
        font-size: 30px;
        font-weight: 500;
        color: #fff;
        text-align: center;
      }
      .login-info{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-flow: column;
        .info{
          height: 25px;
          width: 300px;
          margin-bottom: 10px;
          outline: none;
        }
        .options{
          color:lightgray;
          font-size: 14px;
          .sign-up{
            display: inline;
            float: right;
            span{
              cursor: pointer;
            }
            a{
              color: lightgray;
            }
          }
        }
      }
      .button{
        cursor: pointer;
        width: 100%;
        height: 35px;
        line-height: 35px;
        text-align: center;
        background-color: #409eff;
        color: #fff;
        &:hover{
          opacity: .6;
        }
      }
    }
  }
</style>
