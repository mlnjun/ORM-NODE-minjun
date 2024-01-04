const mongoose = require('mongoose');
const { Schema } = mongoose;


const AutoIncrement = require("mongoose-sequence")(mongoose);

const member = new Schema({
  member_id: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true
  },
  member_password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  profile_img_path: {
    type: String,
    required: false,
  },
  telephone: {
    type: String,
    required: true,
  },
  entry_type_code: {
    type: Number,
    required: true,
  },
  use_state_code: {
    type: Number,
    required: true,
  },
  birth_date: {
    type: Date,
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
member.plugin(AutoIncrement, { inc_field: "member_id"});


// Collection 생성
module.exports = mongoose.model('member', member);