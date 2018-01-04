<template>
  <div id="sign-wrapper">
    <div id="contain">
      <div class="signle">
        基本信息
      </div>
      <div class="info">
        <div class="bank">
          <div class="item" v-for="(item, index) in info" :key="index">
            <label :for="item.for">{{item.info}}</label>
            <input :type="item.type" class="info-input" :id="item.for" v-model="obj[item.for]">
            <span>{{item.sign}}</span>
          </div>
        </div>
        <div class="select">
          <label for="sell">商家</label>
          <input type="radio" id="sell" name="type">
          <label for="take">买家</label>
          <input type="radio" id="take" name="type">
        </div>
      </div>
      <div class="button" @click="signup">
        注册
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'signup',
    data () {
      return {
        obj: {
          user: '',
          password: '',
          name: '',
          smallname: '',
          again: '',
          phone: '',
          mail: ''
        },
        info: [
          {
            for: 'user',
            info: '账号',
            sign: '请输入账号',
            type: 'text'
          },{
            for: 'name',
            info: '昵称',
            sign: '个性名称',
            type: 'text'
          },{
            for: 'smallname',
            info: '姓名',
            sign: '请输入姓名',
            type: 'text'
          },{
            for: 'password',
            info: '密码',
            sign: '请输入密码',
            type: 'password'
          },{
            for: 'again',
            info: '请确认密码',
            sign: '请再次输入密码',
            type: 'password'
          },{
            for: 'phone',
            info: '电话',
            sign: '请输入有效电话',
            type: 'text'
          },{
            for: 'mail',
            info: '邮箱',
            sign: '请输入邮箱',
            type: 'text'
          }
        ]
      }
    },
    methods: {
      signup() {
        if(!this.obj.user || !this.obj.password || !this.obj.name || !this.obj.smallname || !this.obj.again || !this.obj.phone || !this.obj.mail || this.obj.again !== this.obj.password) {
          console.log(this.obj);
          window.alert('信息不全或者2次密码输入不同！！！！');
          return;
        }
        axios.get(`/signup?user=${this.obj.user}&password=${this.obj.password}&name=${this.obj.name}`)
        .then(data => {
          const code = data.data.returnCode;
          const msg = data.data.msg;
          if(code === 0) {
            window.alert(msg);
            return;
          }
          window.alert('注册成功！！！！');
          this.$router.go(-1);
        })
      }
    }
  }
</script>

<style scoped lang="less">
  #sign-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: .7;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-image: url('../../assets/signup/signup.jpg');
    #contain{
      width: 40%;
      height: 600px;
      margin: 0 auto;
      box-shadow: -2px -2px 2px #74a2c9, 5px 5px 5px lightblue;
      .signle{
        height: 50px;
        font-size: 18px;
        color: #000;
        text-align: center;
        line-height: 50px;
        border-bottom: 2px solid #74a2c9;
      }
      .info{
        width: 80%;
        margin: 0 auto;
        .item{
          margin-top: 15px;
          label{
            display: inline-block;
            text-align: left;
            font-size: 14px;
            width: 20%
          }
          input{
            outline: none;
            width: 40%;
          }
          span{
            display: inline-block;
            color: orange;
            font-size: 12px;
            text-indent: 5em;
          }
        }
      }
      .select{
        font-size: 14px;
        margin-top: 20px;
        input{
          margin-right:40px;
        }
      }
      .button{
        width: 40%;
        margin: 50px auto;
        background-color: #409eff;
        text-align:center;
        opacity: .5;
        cursor: pointer;
        &:hover{
          color: #fff;
        }
      }
    }
  }
</style>
