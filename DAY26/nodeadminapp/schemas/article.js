const mongoose = require('mongoose');
const { Schema } = mongoose;


const AutoIncrement = require("mongoose-sequence")(mongoose);

const article = new Schema({
  article_id: {
    type: Number,
    required: true,
    unique: true,
  },
  board_type_code: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  article_type_code: {
    type: Number,
    required: true,
  },
  contents: {
    type: String,
    required: false,
  },
  view_count: {
    type: Number,
    required: true,
  },
  ip_address: {
    type: String,
    required: true,
  },
  is_display_code: {
    type: Number,
    required: true,
  },
  reg_user_id: {
    type: Number,
    required: true,
  },
  reg_date: {
    type: Date,
    default:Date.now(),
    required: true
  },
  edit_user_id: {
    type: Number,
    required: false,
  },
  edit_date: {
    type: Date,
    required: false,
  },
});


// 자동채번
article.plugin(AutoIncrement, { inc_field: "article_id"});


// Collection 생성
module.exports = mongoose.model('article', article);