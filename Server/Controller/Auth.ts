import {RequestHandler,Request,Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


import { valiadationSchema,valiadationRegisterationSchema } from '../Helper/joi.validation';
import { User } from '../Model/role/user';
import { Employee } from '../Model/role/employee';
import { Admin } from '../Model/role/admin';
import { Store } from '../Model/store';



//User Registeration
export const registerUser : RequestHandler = async (req:Request,res:Response) => {
    try{
       const result =await valiadationSchema.validateAsync(req.body)
    }catch(err){
       return res.status(402).send(err);
    }
    
    let user=await User.findOne({email:req.body.email});
    if(user) {return res.status(400).send("User already Registered ")};
    
    try{
        const User_create=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            role:"User", 
        });

        const salt = await bcrypt.genSalt(10);
        User_create.password=await bcrypt.hash(User_create.password,salt);
    
        
        await User_create.save();

        const name:String = req.body.name;
        console.log(`${name} is Created Into The User Database `);
       return res.status(200).json(User_create);
    }catch(e){
        console.log('Error in Creating User In the Database!');
        res.status(400).send("Error in Creating User In the Database!");
    }
}



//Employee Registeration
export const registerEmployee : RequestHandler = async (req:Request,res:Response) => {
    try{
       const result =await valiadationRegisterationSchema.validateAsync(req.body)
    }catch(err){
       return res.status(402).send(err);
    }
    
    let user=await Employee.findOne({email:req.body.email});
    if(user) {return res.status(400).send("Employee already Registered ")};
    
    try{
        const Employee_create=await Employee.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            role:'Employee', 
        });

        const salt = await bcrypt.genSalt(10);
        Employee_create.password=await bcrypt.hash(Employee_create.password,salt);
    
    
        const store_located=await Store.findById(req.body.store_id);
        if(!store_located){
            return res.status(400).send("No Store Found")
        }

        store_located?.employees.push(Employee_create._id);


        await store_located.save();
        await Employee_create.save();

        const name:String = req.body.name;
        console.log(`${name} is Created Into The Employee Database `);
       return res.status(200).json({Employee_create,store_located});
    }catch(e){
        console.log('Error in Creating Employee In the Database!');
        return res.status(400).send("Error in Creating Employee In the Database!");
    }
}


//Admin Registeration
export const registerAdmin : RequestHandler = async (req:Request,res:Response) => {
    try{
       const result =await valiadationSchema.validateAsync(req.body)
    }catch(err){
       return res.status(402).send(err);
    }
    
    let admin=await Admin.findOne({email:req.body.email});
    if(admin) {return res.status(400).send("Admin already Registered ")};
    
    try{
        const Admin_create=await Admin.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            role:'Admin', 
        });

        const salt = await bcrypt.genSalt(10);
        Admin_create.password=await bcrypt.hash(Admin_create.password,salt);
    
        
        await Admin_create.save();

        const name:String = req.body.name;
        console.log(`${name} is Created Into The Admin Database `);
       return res.status(200).json(Admin_create);
    }catch(e){
        console.log('Error in Creating Admin In the Database!');
        return res.status(400).send("Error in Creating Admin In the Database!");
    }
}

//user SignIn
export const userSignIn : RequestHandler = async (req:Request,res:Response) => {
    try{
        const {email,password} = req.body ;
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({ok:false,message:"Not Registered"}) ;
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password) ;
        if(!isPasswordMatch){
            return res.status(400).json({ok:false,message:"Invalid Credentials"}); 
        }
        const authToken = jwt.sign({genid : user._id,role:user.role},process.env.JWT_SECRET_KEY||" ",{expiresIn : '12h'}) ;
        const refreshToken = jwt.sign({genid : user._id,role:user.role},process.env.JWT_REFRESH_SECRET_KEY||" ",{expiresIn : '24h'}) ;

        res.cookie('authToken',authToken,({httpOnly : true})) ;
        res.cookie('refreshToken',refreshToken,({httpOnly:true})) ;
        console.log(authToken);
        return res.status(200).json({ok:true,message : "Login Successful..",userId:user._id}) ;

    }
    catch(err){
        return res.status(403).send("Login Failed..") ;
    }
}


//employee SignIn
export const employeeSignIn : RequestHandler = async (req:Request,res:Response) => {
    try{
        const {email,password} = req.body ;
        const employee= await Employee.findOne({email});

        if(!employee){
            return res.status(400).json({ok:false,message:"Not Registered"}) ;
        }

        const isPasswordMatch = await bcrypt.compare(password,employee.password) ;
        if(!isPasswordMatch){
            return res.status(400).json({ok:false,message:"Invalid Credentials"}); 
        }
        const authToken = jwt.sign({genid : employee._id,role:employee.role},process.env.JWT_SECRET_KEY||" ",{expiresIn : '12h'}) ;
        const refreshToken = jwt.sign({genid : employee._id,role:employee.role},process.env.JWT_REFRESH_SECRET_KEY||" ",{expiresIn : '24h'}) ;

        res.cookie('authToken',authToken,({httpOnly : true})) ;
        res.cookie('refreshToken',refreshToken,({httpOnly:true})) ;
        console.log(authToken);
        return res.status(200).json({ok:true,message : "Employee Login Successful..",empid:employee._id}) ;

    }
    catch(err){
        return res.status(403).send("Employee Login Failed..") ;
    }
}


//Admin SignIn
export const adminSignIn : RequestHandler = async (req:Request,res:Response) => {
    try{
        const {email,password} = req.body ;
        const admin= await Admin.findOne({email});

        if(!admin){
            return res.status(400).json({ok:false,message:"Not Registered"}) ;
        }

        const isPasswordMatch = await bcrypt.compare(password,admin.password) ;
        if(!isPasswordMatch){
            return res.status(400).json({ok:false,message:"Invalid Credentials"}); 
        }
        const authToken = jwt.sign({genid : admin._id,role:admin.role},process.env.JWT_SECRET_KEY||"",{expiresIn : '12h'}) ;
        const refreshToken = jwt.sign({genid : admin._id,role:admin.role},process.env.JWT_REFRESH_SECRET_KEY||"",{expiresIn : '24h'}) ;

        res.cookie('authToken',authToken,({httpOnly : true})) ;
        res.cookie('refreshToken',refreshToken,({httpOnly:true})) ;
        console.log(authToken);
        return res.status(200).json({ok:true,message : "Admin Login Successful..",adminid:admin._id}) ;

    }
    catch(err){
        return res.status(403).send("Admin Login Failed..") ;
    }
}

//logout
export const logout : RequestHandler = async (req:Request,res:Response) => {
    try{
        res.clearCookie('authToken') ;
        res.clearCookie('refreshToken') ;
        return res.status(200).json({ok:true,message:"logged out"}) ;
    }
    catch(err) {
        return res.status(400).json({ok:true,message:"Error logged out"}) ;
    }
}


