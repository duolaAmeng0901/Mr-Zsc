<template>
  <div id="password-wrapper">
    <div class="password">
      <div class="first">
        <label for="once">账号</label>
        <input type="password" id="once" placeholder="账号" v-model="user">
      </div>
      <div class="first">
        <label for="first">原始密码</label>
        <input type="password" id="first" placeholder="密码" v-model="password">
      </div>
      <div class="new">
        <label for="new">新的密码</label>
        <input type="password" id="new" placeholder="新密码" v-model="newPassword">
      </div>
      <div class="again">
        <label for="again">确认新的密码</label>
        <input type="password" id="again" placeholder="新密码" v-model="again">
      </div>
       <div class="button">
        <span class="sure" @click="login">确认</span>
        <span class="back" @click="back">返回</span>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'password',
    data () {
      return {
        user: '',
        password: '',
        newPassword: '',
        again: ''
      }
    },
    methods: {
      login () {
        if(this.newPassword !== this.again || !this.user || !this.password || !this.newPassword || !this.again) {
          window.alert('信息不全或者2次密码不一致');
          return;
        }
        axios.get(`/password?user=${this.user}&password=${this.password}&newPassword=${this.newPassword}`)
        .then(data => {
          if(data.data.returnCode === 0){
            window.alert('账号或密码输入错误！');
            return;
          }
          if(data.data.returnCode === 1){
            window.alert(data.data.msg);
            this.$router.go(-1);
            return;
          }
        })
      },
      back () {
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped lang="less">
  #password-wrapper{
    width: 100%;
    height: 100%;
    background-image: url('../../assets/password/logo.jpeg');
    background-size: contain;
    opacity: .6;
    display: flex;
    justify-content: center;
    align-items: center;
    .password{
      box-shadow: -2px -2px 2px #74a2c9, 5px 5px 5px lightblue;
      width: 30%;
      color: orange;
      .first,
      .new,
      .again{
        font-size: 12px;
        margin: 10px 0;
        label{
          display: block;
          width: 60%;
          margin: 0 auto;
          margin-bottom: 10px;
        }
        input{
          display: block;
          outline: none;
          width: 60%;
          margin: 0 auto;
          height: 18px;
        }

      }
      .button{
        width: 60%;
        margin: 0 auto;
        margin-top: 30px;
        span{
          margin-right: 40px;
          &:hover{
            color: #fff;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
