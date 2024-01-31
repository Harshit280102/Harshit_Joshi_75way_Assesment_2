import { NextFunction, Request, Response } from "express";
import { nmail } from "./nodemailer";
import { Appointment } from "../../Model/appointment";


export const sendMail =async (req:Request,res:Response)=>{
const all_apointment = await Appointment.find({});


const usermail = "harshitjoshi2002@gmail.com";
const name="Harshit Joshi";
    
nmail(usermail,name);

res.send("Email Is Send To Intrested User");
}

//Okay Tested Email Is Sending