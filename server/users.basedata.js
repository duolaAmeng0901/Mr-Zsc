const mongodb = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const produtSchema = new Schema({
  'id': Number,
  'user': String,
  'name': String,
  'password': String,
  'gooas': Array
}, {
  collection: 'info'
});

module.exports = mongoose.model('User', produtSchema);
