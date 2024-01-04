const mongoose = require('mongoose');
const { Schema } = mongoose;


const AutoIncrement = require("mongoose-sequence")(mongoose);

const adminMember = new Schema({
  company_code: {
    type: Number,
    required: true
  },
  admin_id: {
    type: String,
    required: true,
  },
  admin_password: {
    type: String,
    required: true,
  },
  admin_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  dept_name: {
    type: String,
    required: true,
  },
  used_yn_code: {
    type: Number,
    required: true,
  },
  reg_user_id: {
    type: Number,
    default:1,
    unique:false
  },
  reg_date: {
    type: Date,
    required: true,
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
adminMember.plugin(AutoIncrement, { inc_field: "admin_member_id" });



// Collection 생성
module.exports = mongoose.model('admin_member', adminMember);