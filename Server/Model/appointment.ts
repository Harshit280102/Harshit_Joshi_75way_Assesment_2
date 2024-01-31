import { string } from "joi";
import mongoose from "mongoose";


const pointSchema =new mongoose.Schema({
userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
},
storeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Store', 
    required: true 
},
status:{ 
    type: String, enum: ['NOT-AVAILABLE', 'END', 'START'], 
    default: 'NOT-AVAILABLE' 
},
assignedEmployeeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Employee' 
},
scheduledTime:{ 
    type:String, 
    required: true 
},
});

const Appointment =mongoose.model('appointment',pointSchema);

export {Appointment};