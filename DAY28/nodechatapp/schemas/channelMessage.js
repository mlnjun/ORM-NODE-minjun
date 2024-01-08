const mongoose = require('mongoose');
const { Schema } = mongoose;


const AutoIncrement = require("mongoose-sequence")(mongoose);

const channelMessage = new Schema({
  channel_msg_id:{
    type: Number
  },
  channel_id: {
    type: Number,
    ref: 'channel'
  },
  member_id: {
    type: Number,
    ref: 'member'
  },
  nick_name: {
    type: String,
    required: true,
  },
  msg_type_code: {
    type: Number,
    required: true,
  },
  connection_id: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
  ip_address: {
    type: String,
    required: false,
  },
  top_channel_msg_id: {
    type: Number,
    required: true,
  },
  msg_state_code: {
    type: Number,
    required: true,
  },
  msg_date: {
    type: Date,
    required: true,
  },
  reg_date: {
    type: Date,
    default: Date.now,
    required: false
  },
  reg_member_id: {
    type: Number,
    required: false,
  },
});

channelMessage.plugin(AutoIncrement, { inc_field : "channel_msg_id" });




// Collection 생성
module.exports = mongoose.model('channel_message', channelMessage);