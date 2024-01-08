const mongoose = require('mongoose');
const { Schema } = mongoose;


const AutoIncrement = require("mongoose-sequence")(mongoose);

const channel = new Schema({
  community_id: {
    type: Number,
    required: true
  },
  category_code: {
    type: Number,
    required: true,
  },
  channel_name: {
    type: String,
    required: true,
  },
  user_limit: {
    type: Number,
    required: false,
  },
  channel_img_path: {
    type: String,
    required: true,
  },
  channel_desc: {
    type: String,
    required: true,
  },
  channel_state_code: {
    type: Number,
    required: true,
  },
  reg_user_id: {
    type: Number
  },
  reg_date: {
    type: Date,
    default: Date.now,
    required: true
  },
  edit_user_id: {
    type: Number,
    required: false,
    default: null
  },
  edit_date: {
    type: Date,
    required: false,
    default: null
  },
});


// 자동채번
channel.plugin(AutoIncrement, { inc_field: "channel_id"});
channel.plugin(AutoIncrement, { inc_field: "reg_user_id"});


// Collection 생성
module.exports = mongoose.model('channel', channel);