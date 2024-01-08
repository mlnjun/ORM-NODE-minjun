const mongoose = require('mongoose');
const { Schema } = mongoose;

const AutoIncrement = require("mongoose-sequence")(mongoose);


const memberSchema = new Schema({
    email:{
      type:String,
      required:true,
      unique:true
    },
    member_password:{
      type:String,
      required:true
    },
    name:{
      type:String,
      required:true
    },
    profile_img_path:{
      type:String,
      required:false
    },
    telephone:{
      type:String,
      required:true
    },
    entry_type_code:{
      type:Number,
      required:true
    },
    use_state_code:{
      type:Number,
      required:true
    },
    birth_date:{
      type:Date,
      required:true
    },
    reg_date:{
      type:Date,
      required:true,
      default:Date.now
    },
    reg_member_id:{
      type:Number
    },
    edit_date:{
      type:Date,
      required:false,
      default: null
    },
    edit_member_id:{
      type:Number,
      required:false,
      default: null
    }
});


memberSchema.plugin(AutoIncrement, { inc_field: "member_id" });
memberSchema.plugin(AutoIncrement, { inc_field: "reg_member_id" });


module.exports = mongoose.model('member', memberSchema);