import {RequestHandler,Request,Response} from 'express';
import { Appointment } from '../Model/appointment';

export const checkAppointment : RequestHandler = async (req:Request,res:Response) => {
    const {store_id} =req.body;
    try{
    const result=await  Appointment.find({storeId:store_id});
    return res.status(200).json(result) ;
    }
    catch(err) {
        return res.status(400).json({ok:true,message:err}) ;
    }
}


