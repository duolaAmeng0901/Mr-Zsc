const mongodb = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const produtSchema = new Schema({
  'id': Number,
  'goodsName': String,
  'number': Number,
  'author': String,
  'price': Number
}, {
  collection: 'goods'
});

module.exports = mongoose.model('Goods', produtSchema);
