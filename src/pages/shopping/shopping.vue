<template>
  <div id="shopping-wrapper">
    <div v-if="!showTrade">
      <h1 class="title">我的购物车</h1>
      <div class="tradeList">
        <div class="tradeInfo" v-for="(item, index) in list" :key="index" @click="trade(item)">
          <div class="pic"></div>
          <div class="info">
            <div>商品名称: {{item.goodsName}}</div>
            <div>价格: {{item.price}}</div>
          </div>
          <div class="number">X  {{item.number}}</div>
        </div>
      </div>
    </div>
    <v-trade v-if="showTrade" :data="data" @changeStatus="change"></v-trade>
  </div>
</template>

<script>
  import vTrade from '../../components/vTrade.vue';
  import axios from 'axios';

  export default {
    components: {
      vTrade
    },
    created () {
      const self = this;
      let arr = [];
      axios.get(`/login?user=${window.sessionStorage.getItem('user')}`)
      .then(data => {
        arr = data.data.result[0].gooas;
      })
      .then(() => {
        arr.forEach((value, index) => {
          axios.get(`/good?goodsName=${value.goodsName}`)
          .then(data => {
            value.price = data.data.result[0].price;
            this.list.push(value);
          })
        })
      })
    },
    data () {
      return {
        list: [],
        showTrade: false
      }
    },
    methods: {
      trade (a) {
        this.data = a;
        this.data.number = a.number
        this.showTrade = !this.showTrade;
      },
      change () {
        this.showTrade = !this.showTrade;
      },
    }
  }
</script>

<style scoped lang="less">
  *{
    margin: 0;
    padding: 0;
  }
  #shopping-wrapper{
    width: 100%;
    .title{
      position: relative;
      color: #ff0036;
      font-size: 20px;
      padding: 10px 0;
      text-align: center;
      background-color: #f8f8f8;
      border-bottom: 1px solid gray;
      &::after{
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        content: '';
        margin-left: 10px;
        display: inline-block;
        width: 20px;
        height: 20px;
        background-size: 100% 100%;
        background-image: url('../../assets/buy/shopping.png');
      }
    }
    .tradeList{
      margin: 0 auto;
      margin-top: 20px;
      width: 60%;
      height: 100px;
      .tradeInfo{
        cursor: pointer;
        width: 100%;
        height: 70px;
        background-color: yellow;
        margin-bottom: 10px;
        border: 1px solid gray;
        .pic{
          float: left;
          background-size: 100% 100%;
          background-image: url('../../assets/logo.png');
          width: 40px;
          height: 60px;
          margin-top: 5px;
          margin-left: 30px;
          margin-right: 140px;
        }
        .info{
          float: left;
          div{
            line-height: 35px;
          }
        }
        .number{
          float: right;
          margin-right: 20px;
          line-height: 70px;
          color: #ff0036;
        }
      }
    }
  }
</style>
