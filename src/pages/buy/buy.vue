<template>
  <div id="buy-wrapper">
    <div class="contain" v-if="!showTrade">
      <div class="header">
        <div class="left">
          <span class="art">hello, 欢迎来到晓书</span>
          <div class="name" v-if="persionName">{{persionName}}</div>
          <div class="login" v-if="!persionName">
            <router-link to="/login" tag="span">请登录</router-link>
            <router-link to="/signup" tag="span">免费注册</router-link>
          </div>
        </div>
        <div class="right">
          <router-link class="shopping" to="/shopping" tag="span">购物车{{number}}件</router-link>
          <router-link class="trade" to="/trade" tag="span">我的订单</router-link>
        </div>
      </div>
      <div class="search-contain">
        <div class="search">
          <input type="text" class="search-input" placeholder="请输入关键字" v-model="good">
          <span class="search-button" @click="search">搜索</span>
        </div>
      </div>
      <div class="goods-contain">
        <div class="goods">
          <div class="good-item" v-for="(item, index) in goodinfo" :key="index" @click="trade(item)">
            <div class="good-pic">
            </div>
            <div class="good-name">{{item.goodsName}}</div>
            <div class="good-price">{{item.price}}</div>
          </div>
        </div>
      </div>
    </div>
    <v-trade v-if="showTrade" :data="data" @changeStatus="change"></v-trade>
  </div>
</template>

<script>
  import axios from 'axios';
  import vTrade from '../../components/vTrade.vue';
  export default {
    created () {
      this.persionName = window.sessionStorage.getItem('name');
      axios.get(`/login?user=${window.sessionStorage.getItem('user')}`)
      .then(data => {
        this.number = 0;
        data.data.result[0].gooas.forEach(value => {
          this.number = parseInt(this.number) + parseInt(value.number);
        })
      })
      axios.get('/goods')
      .then(data => {
        this.goodinfo = data.data.result;
      })
    },
    components: {
      vTrade
    },
    data () {
      return {
        number: '',
        showTrade: false,
        goodinfo: [],
        data: {},
        good: ''
      }
    },
    methods: {
      trade (a) {
        this.data = a;
        this.showTrade = !this.showTrade;
      },
      change () {
        this.showTrade = !this.showTrade;
      },
      search() {
        if(this.good == '') {
          alert('请输入关键字');
          return;
        }
        axios.get(`/good?goodsName=${this.good}`)
        .then(data => {
          if(data.data.returnCode === 0) {
            window.alert(data.data.msg);
            return;
          }
          this.goodinfo = data.data.result;
        })
      }
    }
  }
</script>

<style scoped lang='less'>
  *{
    margin: 0;
    padding: 0;
    font-family: "Microsoft YaHei",tahoma,arial,'Hiragino Sans GB','\5b8b\4f53',sans-serif;
  }
  #buy-wrapper{
    width: 100%;
    .contain{
      width: 100%;
      margin: 0 auto;
      .header{
        width: 100%;
        height: 30px;
        font-size: 12px;
        color: lightgrey;
        line-height: 30px;
        border: 1px solid lightgray;
        background-color: #f8f8f8;
        &::after{
          content: '';
          display: block;
          clear: both;
        }
        .left{
          float:left;
          height: 30px;
          margin-left: 10%;
          .name,
          .login{
            display: inline;
            margin-left: 20px;
          }
          .name{
            margin-left: 20px;
          }
          .login{
            cursor: pointer;
            color: #b72412;
            span{
              margin-left: 15px;
            }
          }
        }
        .right{
          float: right;
          height: 30px;
          margin-right: 15%;
          .shopping{
            cursor: pointer;
            position: relative;
            line-height: 30px;
            &::before{
              position: absolute;
              right: 70px;
              top: 0;
              bottom: 0px;
              margin: auto 0;
              display: inline-block;
              content: '';
              width: 14px;
              height: 14px;
              background-image: url('../../assets/buy/shopping.png');
              background-size: 100% 100%;
            }
          }
        }
      }
      .search-contain{
        font-size: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 130px;
        background-color: #fff;
        .search-input{
          outline: none;
          padding: 5px;
          font: 16px/22px arial;
          width: 491px;
          height: 30px;
          border: 2px solid #ff0036;
        }
        .search-button{
          cursor: pointer;
          color: #fff;
          vertical-align: -2px;
          font-size: 18px;
          padding: 11px 40px;
          background-color: #ff0036;
        }
      }
      .goods-contain{
        width: 80%;
        height: 600px;
        margin: 0 auto;
        margin-left: 12%;
        .good-item{
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          flex-direction: column;
          padding: 5px;
          border: 1px solid black;
          width: 14%;
          float: left;
          margin: 2%;
          &:hover{
            border: 1px solid #ff0036;
          }
          .good-pic{
            top: 50%;
            width: 90%;
            padding-top: 120%;
            background-size: 100% 100%;
            background-image: url('../../assets/logo.png');
          }
          .good-name
          .good-price{
            margin-top: 6px;
            width: 90%;
            margin: 0 auto;
            text-align: center;
          }
        }
      }
    }

  }
</style>
