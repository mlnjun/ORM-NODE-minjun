const mongoose = require('mongoose');
const { Schema } = mongoose;


const AutoIncrement = require("mongoose-sequence")(mongoose);

const channelMember = new Schema({
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
  member_type_code: {
    type: Number,
    required: true,
  },
  active_state_code: {
    type: Number,
    required: true,
  },
  last_contact_date: {
    type: Date,
    required: false,
  },
  last_out_date: {
    type: Date,
    required: false,
  },
  connection_id: {
    type: Number,
    required: true,
  },
  ip_address: {
    type: String,
    required: true,
  },
  reg_date: {
    type: Date,
    default:Date.now(),
    required: true
  },
  reg_member_id: {
    type: Number,
    required: true,
  },
});




// Collection 생성
module.exports = mongoose.model('channel_member', channelMember);