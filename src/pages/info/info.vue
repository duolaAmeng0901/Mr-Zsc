<template>
  <div id="info-wrapper">
    <div class="title">
      <div class="logo"></div>
      <div class="name">晓书后台管理系统</div>
      <div class="user">用户: admin</div>
      <div class="set">设置</div>
      <div class="esc">推出</div>
    </div>
    <div class="contain">
      <div class="left">
        <div class="user-grop" @click="boolean = true">用户管理</div>
        <div class="goods-grop" @click="boolean = false">商品管理</div>
      </div>
      <div class="right">
        <div class="user-info" v-if="boolean">
          <div class="sign">
            <div class="id">用户ID</div>
            <div class="name">用户账号</div>
            <div class="small-name">用户昵称</div>
            <div class="tele">用户电话</div>
            <div class="date">注册日期</div>
            <div class="do">操作</div>
          </div>
          <div class="con" v-for="(item, index) in users" :key="index">
            <div class="id">{{item._id.slice(0, 6)}}</div>
            <div class="name">{{item.user}}</div>
            <div class="small-name">{{item.name}}</div>
            <div class="tele">112301230</div>
            <div class="date">2017/02/01</div>
            <div class="do">
              <span class="dele" @click="deleuser(item)">删除</span>
            </div>
          </div>
        </div>
        <div class="good-info" v-if="!boolean">
          <div class="sign">
            <div class="id">商品ID</div>
            <div class="name">商品名称</div>
            <div class="price">商品价格</div>
            <div class="author">作者</div>
            <div class="number">商品库存</div>
            <div class="do">操作</div>
          </div>
          <div class="con" v-for="(item, index) in goods" :key="index">
            <div class="id">{{item._id.slice(0, 6)}}</div>
            <div class="name">{{item.goodsName}}</div>
            <div class="price">{{item.price}}</div>
            <div class="author">{{item.author}}</div>
            <div class="number">{{item.number}}</div>
            <div class="do">
              <span class="change" @click="change(item)">修改</span>
              <span class="dele" @click="del(item)">删除</span>
            </div>
          </div>
          <span class="add" @click="">增加商品</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    created() {
      axios.get('/alluser')
      .then(data => {
        this.users = data.data.result;
      });
      axios.get('/goods')
      .then(data => {
        this.goods = data.data.result;
      })
    },
    data() {
      return {
        boolean: false,
        users: [],
        goods: []
      }
    },
    methods: {
      deleuser(a) {
        axios.get(`/deleteusr?user=${a.user}`)
        .then(data => {
          const msg = data.data.msg;
          window.alert(msg);
        })
      },
      add() {
        axios.get(`/addgood?number=${this.number}&price=${this.price}$goodsName=${this.goodsName}`)
      }
    }
  }
</script>

<style scoped lang="less">
  #info-wrapper{
    width: 100%;
    height: 100vh;
    .title{
      width: 100%;
      height: 60px;
      background-color: #3385ff;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 14px;
      div{
        float: left;
      }
      .logo{
        width: 40px;
        height: 40px;
        margin-top: 10px;
        background-image: url('../../assets/info/logo.png');
        background-size: 100% 100%;
        margin-left: 30px;
      }
      .name{
        line-height: 60px;
        color: #fff;
        margin-left: 20px;
      }
      .user{
        cursor: pointer;
        margin-left: 800px;
        padding: 0 30px;
        border-right: 1px solid lightblue;
      }
      .set{
        cursor: pointer;
        padding: 0 30px;
        border-right: 1px solid lightblue;
      }
      .esc{
        cursor: pointer;
        padding: 0 30px;
        border-right: 1px solid lightblue;
      }
    }
    .contain{
      position: relative;
      width: 100%;
      .left{
        color: #fff;
        display: flex;
        height: 766px;
        justify-content: space-around;
        flex-direction: column;
        float: left;
        width: 12%;
        background-color: #42b983;
        .user-grop{
          cursor: pointer;
          position: relative;
          border-bottom: 1px solid lightgrey;
          border-top: 1px solid lightgrey;
          padding: 10px 0;
          text-align: center;
          &:hover{
            opacity: .5;
          }
          &::after{
            position: absolute;
            right: 12px;
            top: 19px;
            width: 0;
            height: 0;
            content: '';
            display: inline-block;
            border: 5px solid transparent;
            border-left: 5px solid #fff;
          }
        }
        .goods-grop{
          &:hover{
            opacity: .5;
          }
          cursor: pointer;
          position: relative;
          border-bottom: 1px solid lightgrey;
          border-top: 1px solid lightgrey;
          padding: 15px 0;
          text-align: center;
          &::after{
            position: absolute;
            right: 12px;
            top: 19px;
            width: 0;
            height: 0;
            content: '';
            display: inline-block;
            border: 5px solid transparent;
            border-left: 5px solid #fff;
          }
        }
      }
      .right{
        padding-top: 30px;
        .good-info,
        .user-info{
          .sign,
          .con{
            display: flex;
            justify-content: space-around;
            div{
              width: 100%;
              height: 40px;
              text-align: center;
              border: 1px solid gray;
              line-height: 40px;
            }
          }
          .sign{
            div{
              font-weight: 500;
            }
          }
          .con{
            div{
              color: lightgray;
              font-size: 14px;
            }
            .id{
              color: #ff0036;
            }
            .do{
              .change{
                cursor: pointer;
                color: #3385ff;
                margin-right: 20px;
              }
              .dele{
                cursor: pointer;
                color: #ff0036;
              }
            }
          }
        }
        .good-info{
          .add{
            cursor: pointer;
            position: absolute;
            left: 600px;
            bottom: -600px;
            display: block;
            width: 10%;
            height: 50px;
            background-color: #ff0036;
            line-height: 50px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            &:hover{
              opacity: .6;
            }
          }
        }
      }
    }
  }
</style>
