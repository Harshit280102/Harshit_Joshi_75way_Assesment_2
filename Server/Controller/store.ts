import {RequestHandler,Request,Response} from 'express';
import {validateTime} from '../Helper/joi.validation';
import {Store} from '../Model/store';
import { Appointment } from '../Model/appointment';
import { Admin } from '../Model/role/admin';
import jwt from 'jsonwebtoken';
import { Employee } from '../Model/role/employee';
import { User } from '../Model/role/user';

interface store{
    storeName:string
    open:string
    close:string
    noOfEmp:Number
    employees?:[]
    appointments?:[]
}

//create Store
export const createStore : RequestHandler =async(req,res)=>{
    const storedata:store= req.body;
    const adminid =req.genid;

    try{
        const result =await validateTime.validateAsync(storedata)
    }catch(err){
        return res.status(402).send(err);
    }

    if(!adminid) {return res.status(500).send("Admin can only create Data")}
   
    let admin=await Admin.findOne({_id:adminid});
    if(!admin){res.status(401).send("Admin not Found")}
    
        
   
    
    let store =await Store.findOne({storeName:storedata.storeName})
    if(store) {return res.status(400).send("Platform already Exists!!")}

    
    try{
        const created_store = new Store(storedata);

         const saved = await created_store.save();
         
        // api_key maybe needed in future

        //     const api_key = jwt.sign({    
        //     storeid:saved._id,
        //     storeadmin:adminid,
        // },process.env.JWT_PLATFORM_KEY||"",) ;

          return res.status(201).json({
            message: `Store ${created_store.storeName} created successfully`,
            store: saved,
            // api_key: api_key
          });
    }
    catch(error) {
        console.error(error);
        return res.status(500).send("Error in creating the Store");
    }
}

//Add Employee is done at the time to Employee Registeration 

//Book Appointment
export const bookAppointment : RequestHandler =async(req,res)=>{

    const {storeId,employeeId,scheduledTime}= req.body;
    const userId =req.genid;

    
   try{
    const store_located=await Store.findById(storeId);
    const employee=await Employee.findById(employeeId);
    const user =await User.findById(userId);

   const appoint_a= scheduledTime?.split(':')[0];
   const appoint_b=scheduledTime?.split(':') [0];

   const start= store_located?.open;
   const close= store_located?.close;

   const start_a=start?.split(':')[0];
   const start_b=start?.split(':')[1];
   const close_a=close?.split(':')[0];
   const close_b=close?.split(':')[1];

   const appdata={
    userId:user?._id,
    storeId:store_located?._id,
    assignedEmployeeId:employee?._id,
    scheduledTime:scheduledTime,
}

// Pending Logic for now
//    if(start_a && close_a && appoint_a && start_b && close_b && appoint_b){
//     if(start_a<appoint_a || close_a < appoint_a){
        const created_appointment =new Appointment(appdata);
        const appoint_saved= await created_appointment.save();

        res.status(200).json({appoint_saved});
//     }
//    }else{
//     res.send(200).send("Store is closed")
//    }
   }catch(err){
    res.status(400).send(err)
   }
}