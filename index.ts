import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from 'body-parser' ;
import cors from 'cors' ;
import cookieParser from 'cookie-parser' ;
import { CronJob } from 'cron';

import {registerUser,registerEmployee,registerAdmin,userSignIn,employeeSignIn,adminSignIn,logout} from './Server/Controller/Auth';
import {checkAdmin,checkEmpnot} from './Server/Middleware/Access';
import {createStore,bookAppointment} from './Server/Controller/store';
import {checkAppointment} from './Server/Controller/Appointment';
import {sendMail} from './Server/Helper/mail/cron'

import { nmail } from "./Server/Helper/mail/nodemailer";


dotenv.config();

declare global {
    namespace Express {
      interface Request {
        genid?:string;
      }
    }
  }

const connection=process.env.TS_MONGODB_CONNECT;

const app=express();
app.use(express.json());
app.use(cors({
    credentials : true , 
}))

app.use(bodyParser.json()) ;
app.use(cookieParser()) ;


app.post('/user/register',registerUser);      //okay Tested
app.post('/user/sigin',userSignIn);            //okay Tested

app.post('/employee/register',registerEmployee); //okay Tested           
app.post('/employee/sigin',employeeSignIn);     //okay Tested

app.post('/admin/register',registerAdmin);      //okay Tested  
app.post('/admin/sigin',adminSignIn);           //okay Tested

app.delete("/logout",logout);                   //okay Tested

app.post("/createstore",checkAdmin,createStore)  //okay Tested

//made check employee so that no employee can book himself or other employee in the store maybe not needed in this project
app.post("/bookappointment",checkEmpnot,bookAppointment)  //okay Tested 

app.get("/available",checkAppointment);  //okay Tested

app.get("/send",sendMail);


app.get("/",(req:any,res:any)=>{
  res.send("Hello This Is Store Appointment Management Server By Harshit Joshi");
})


app.listen(process.env.TS_PORT_KEY,async()=>{
    await connect_to_db(connection);
    console.log(`Server is Running at Port ${process.env.TS_PORT_KEY} `);
});




async function connect_to_db(connection:string |undefined){
    if(typeof connection!== "string"){
        console.log(`Error In Connecting Database To Server Due TO wrong Connection Key `);
        return;
    }
    try{ 
        await mongoose.connect(connection);
        console.log(`Database Is Connecting To Server:${process.env.TS_PORT_KEY} `);
    }catch(e){
        console.log(`Error In Connecting Database To Server:${process.env.TS_PORT_KEY} `);
        }
    }

  