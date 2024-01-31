import mongoose from "mongoose";


const storeSchema =new mongoose.Schema({
storeName:{
    type:String,
    required:true,
    unique:true,
},
open:{
    type:String,
    required:true,
},
close:{
    type:String,
    required:true,
},
noOfEmp:{
    type:Number,
    require:true,
    default:0,
    min:0,
},
employees:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Employee',
}],
appointments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Appointment'
}]
});

storeSchema.path('employees').default([]);
storeSchema.path('appointments').default([]);

const Store =mongoose.model('store',storeSchema);

export {Store};