import mongoose from "mongoose";

const employeeSchema =new mongoose.Schema({
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
        enum:['Employee'],
    },
    assignedAppointments:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Appointment' 
    }]
});

employeeSchema.path('assignedAppointments').default([]);

const Employee =mongoose.model('employee',employeeSchema);

export {Employee};

