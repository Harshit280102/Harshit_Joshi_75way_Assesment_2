import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from 'body-parser' ;
import cors from 'cors' ;
import cookieParser from 'cookie-parser' ;
import { CronJob } from 'cron';

import {registerUser,registerEmployee,registerAdmin,userSignIn,employeeSignIn,adminSignIn,logout} from './Controller/Auth';
import {checkAdmin,checkEmpnot} from './Middleware/Access';
import {createStore,bookAppointment} from './Controller/store';
import {checkAppointment} from './Controller/Appointment';
import {sendMail} from './Helper/mail/cron'


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


app.post('/user/register',registerUser);      //okay Tested   //client okay
app.post('/user/signin',userSignIn);            //okay Tested   //client okay

app.post('/employee/register',registerEmployee); //okay Tested   //client okay
app.post('/employee/signin',employeeSignIn);     //okay Tested    //client okay

app.post('/admin/register',registerAdmin);      //okay Tested     //client okay
app.post('/admin/signin',adminSignIn);           //okay Tested     //client okay

app.delete("/logout",logout);                   //okay Tested     //client okay

app.post("/createstore",checkAdmin,createStore)  //okay Tested    //client okay



//made check employee so that no employee can book himself or other employee in the store maybe not needed in this project
app.post("/bookappointment",checkEmpnot,bookAppointment)  //okay Tested 

app.get("/available",checkAppointment);  //okay Tested

app.get("/send",sendMail);              //okay Tested


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

  