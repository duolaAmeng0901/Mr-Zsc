<template>
  <div id="trade-wrapper">
    <div class="contain">
      <div class="left">
      </div>
      {{goodinfo}}
      <div class="right">
        <div class="name">{{goodinfo.goodsName}}</div>
        <div class="price">{{goodinfo.price}} / 本</div>
        <div class="number">
          <input type="number" class="input" v-model="number">
          库存 : {{goodinfo.number}}本
        </div>
        <div class="adress">
          <input type="text" class="adress-input" placeholder="请输入地址">
        </div>
        <div class="button">
          <span class="guid" @click="trade">立即购买</span>
          <span class="add" @click="add">加入购物车</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    created () {
      if(window.location.hash === '#/shopping') {
        this.number = this.data.number;
        axios.get(`/good?goodsName=${this.data.goodsName}`)
        .then(data => {
          this.goodinfo = data.data.result[0];
        })
      }
    },
    data () {
      return {
        goodinfo: this.data,
        number: ''
      }
    },
    props: ['data'],
    methods: {
      trade () {
        let self = this;
        axios.get(`/trade?goodsName=${this.goodinfo.goodsName}&number=${this.number}`)
        .then(data => {
          const code = data.data.returnCode;
          const msg = data.data.msg;
          if(code === 0) {
            window.alert(msg)
          }else {
            window.alert(msg);
            self.$emit('changeStatus');
          }
        })
        if(window.location.hash == '#/shopping') {
          axios.get(`/user?user=${window.sessionStorage.getItem('user')}&number=${this.number}&goodsName=${this.goodinfo.goodsName}`);
        }
      },
      add () {
        if(window.location.hash === '#/shopping') {
          window.alert('定点击立即购买或者刷新返回购物车!!');
          return;
        }
        axios.get(`/add?user=${window.sessionStorage.getItem('user')}&number=${this.number}&goodsName=${this.goodinfo.goodsName}`)
        .then(data => {
          window.alert(data.data.msg);
        })
      }
    }
  }
</script>

<style scoped lang="less">
  #trade-wrapper{
    width: 100%;
    height: 100vh;
    .contain{
      width: 80%;
      margin: 0 auto;
      .left{
        width: 50%;
        padding-top: 60%;
        background-size: 100% 100%;
        background-image: url('../assets/logo.png');
      }
      .right{
        width: 50%;
        color: #ff0036;
        .name,
        .price,
        .number,
        .adress,
        .button{
          text-align: center;
        }
        .name{
          color: lightblue;
        }
        .price{
          color: #000;
        }
        .number{
          .input{
            outline: none;
            width: 30px;
            height: 20px;
          }
          font-size: 12px;
        }
        .adress{
          .adress-input{
            width: 100%;
            height: 30px;
            outline: none;
          }
        }
        .button{
          margin-top: 20px;
          span{
            border: 1px solid gray;
            padding: 10px 40px;
          }
          .guid{
            cursor: pointer;
            color:#fff;
            background-color: gray;
          }
          .add{
            cursor: pointer;
            background-color: #ff0036;
            color: #fff;
          }
        }
      }
    }
  }
</style>
