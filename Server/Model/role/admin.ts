//could create Admin with User also but created it in diffrent table for simplicity

import mongoose from "mongoose";

const adminSchema =new mongoose.Schema({
name:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
    unique:true,
},
password:{
    type:String,
    required:true,
},role:{
    type:String,
    enum:['Admin'],
},
});

const Admin =mongoose.model('admin',adminSchema);

export {Admin};
