'use strict'

const config = require('../config');

if(!process.env.NODE_ENV){
  process.env.NODE_ENV = config.dev.env;
}

let webpackConfig = require('../build/webpack.base.conf.js');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const express = require('express');
const path = require('path');
const opn = require('opn');

webpackConfig = merge(webpackConfig, {
  devtool: config.dev.devtool,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
  ]
})
webpackConfig.entry.app.unshift('webpack-hot-middleware/client?reload=true?reload=true&log=console.log');

//配置
const app = express();
const compiler = webpack(webpackConfig);
const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  status: {
    color: true
  },
  hot: true
})
const hotMiddleware = webpackHotMiddleware(compiler)

app.use(devMiddleware);
app.use(hotMiddleware);
// app.use(require('connect-history-api-fallback')());

const port = config.dev.port;


// opn('http://localhost:' + port);

//路由
const fs = require('fs');
const mongoose = require('mongoose');
const url = require('url');

const Users = require('./users.basedata.js');
const Goods = require('./goods.basedata.js');
mongoose.connect('mongodb://127.0.0.1:27017/owner');
mongoose.connection.on('connected', () => {
  console.log('success');
})

//获取登陆用户信息
app.get('/login', function (req, res) {
  let query = url.parse(req.url, true).query;
  Users.find(query, (err, doc) => {
    if(err) {
      res.json({
        returnCode: 0
      })
    }else{
      res.json({
        returnCode: 1,
        result: doc
      })
    }
  })
})
//获取全部用户信息
app.get('/alluser', function (req, res) {
  Users.find({
    user: {
      $ne: 'admin'
    }
  }, (err, doc) => {
    console.log(doc);
    res.json({
      returnCode: 1,
      result: doc
    })
  })
})
//删除用户信息
app.get('/deleteusr', (req, res) => {
  let query = url.parse(req.url, true).query;
  const user = query.user;
  Users.remove({
    user
  }, (err, doc) => {
    res.json({
      msg: '删除该用户成功！！'
    })
  })
})
//获得全部商品信息
app.get('/goods', (req, res) => {
  let query = url.parse(req.url, true).query;
  Goods.find({}, (err, doc) => {
    if(err) {
      res.json({
        returnCode: 0
      })
    }else{
      res.json({
        returnCode: 1,
        result: doc
      })
    }
  })
});

//更改密码
app.get('/password', (req, res) => {
  let query = url.parse(req.url, true).query;
  let q = {
    user: query.user,
    password: query.password
  }
  Users.find(q, (err, doc) => {
    if(err) {
      res.json({
        returnCode: 0
      })
    }else{
      if(doc.length === 0){
        res.json({
          returnCode: 0
        })
      }else{
        doc[0].password = query.newPassword;
        Users.update(q, doc[0], (err, doc) => {
          if(err) {
            console.log(err);
          }else{
            res.json({
              returnCode: 1,
              msg: '密码修改成功！'
            })
          }
        })
      }
    }
  })
})

//注册
app.get('/signup', (req, res) => {
  let query = url.parse(req.url, true).query;
  let q = {
    user: query.user
  }
  let obj = {
    user: query.user,
    name: query.name,
    goods: [],
    password: query.password
  }
  Users.find(q, (err, doc) => {
    if(err) {
      res.json({
        returnCode: 0,
        msg: '数据库发生错误'
      })
    }else {
      if(doc.length !== 0) {
        res.json({
          returnCode: 0,
          msg: '该用户已经存在'
        })
      }else {
        Users.create(obj, (err, doc) => {
          if(err) {
            res.json({
              returnCode: 0
            })
          }else{
            res.json({
              returnCode: 1
            })
          }
        })
      }
    }
  })
})

//购买
app.get('/trade', (req, res) => {
  let query = url.parse(req.url, true).query;
  const goodsName = query.goodsName;
  Goods.find({
    goodsName
  }, (err, doc) => {
    if(err) {
      res.json({
        returnCode: 0
      })
    }else {
      doc[0].number = doc[0].number - query.number;
      if(doc[0].number < 0) {
        res.json({
          returnCode: 0,
          msg: '库存不足'
        })
      }else {
        Goods.update({
          goodsName
        }, doc[0],(err, doc) => {
          if(err) {
            res.json({
              returnCode: 0,
              msg: '库存不足'
            })
          }else {
            res.json({
              returnCode: 1,
              msg: '购买成功'
            })
          }
        })
      }
    }
  })
})

//加入购物车
app.get('/add', (req, res) => {
  let query = url.parse(req.url, true).query;
  const goodsName = query.goodsName;
  const number = query.number;
  const user = query.user;
  Users.find({
    user
  }, (err, doc) => {
    if(err) {
      res.json({
        returnCode: 0,
        msg: err
      })
    }else {
      if(doc[0].gooas.some(value => value['goodsName'] === goodsName )) {
        doc[0].gooas.map(value => {
          if(value['goodsName'] === goodsName){
            value['number'] = parseInt(number) + parseInt(value['number']);
          }
          return value
        })
      }else {
        doc[0].gooas.push({
          goodsName,
          number
        })
      }
      Users.update({
        user
      }, doc[0], (err, data) => {
        if(err) {
          return;
        }
        res.json({
          returnCode: 1,
          msg: '成功加入购物车'
        })
      })
    }
  })
})

//查询具体商品
app.get('/good', (req, res) => {
  let query = url.parse(req.url, true).query;
  Goods.find(query, (err, doc) => {
    if(err) {
      res.json({
        returnCode: 0
      })
    }else{
      if(doc.length === 0) {
        res.json({
          returnCode: 0,
          msg: '查无此书!!!'
        })
        return;
      }
      res.json({
        returnCode: 1,
        result: doc
      })
    }
  })
})

//更新用户信息
app.get('/user', (req, res) => {
  let query = url.parse(req.url, true).query;
  const user = query.user;
  const goodsName = query.goodsName;
  const number = query.number;
  let arr;
  Users.find({
    user
  }, (err, doc) => {
    arr = doc[0].gooas.filter(value => {
      if(value['goodsName'] === goodsName){
        value.number = parseInt(value.number) - parseInt(number);
        if(value.number < 0) {
          return false;
        }
      }
      return value;
    })
    doc[0].gooas = arr;

    Users.update({
      user
    }, doc[0], (err, data) => {
      res.json({
        returnCode: 1
      })
    })


  })
})

//增加商品
app.get('/addgood', (req, res) => {
  let query = url.parse(req.url, true).query;
  let q = {
    goodsName: query.goodsName
  }
  let obj = {
    number: query.number,
    goodsName: query.goodsName,
    author: query.author,
    price: query.prive
  }
  Goods.find(q, (err, doc) => {
    if(err) {
      res.json({
        returnCode: 0,
        msg: '数据库发生错误'
      })
    }else {
      if(doc.length !== 0) {
        res.json({
          returnCode: 0,
          msg: '该商品已经存在'
        })
      }else {
        Goods.create(obj, (err, doc) => {
          if(err) {
            res.json({
              returnCode: 0
            })
          }else{
            res.json({
              returnCode: 1
            })
          }
        })
      }
    }
  })
})
app.listen(port);




