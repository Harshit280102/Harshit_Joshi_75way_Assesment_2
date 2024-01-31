import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

export const nmail =async (email:any,name:any)=>{

    let config={
        service:'gmail',
        auth:{
        user:process.env.TS_GMAIL,
        pass:process.env.TS_PASS,
        }
    }
    
    let transporter=nodemailer.createTransport(config);
    
    transporter.verify(function(error, success) {
    if (error) {
    console.log(error);
    } 
    else 
    {
    console.log('Server is ready to take our messages');
    }
    });
    let MailGenerator =new Mailgen({
    theme:"default",
    product:{
        name:"Harshit's Server For Job",
        link:"https://mailgen.js"
    }
    })
    
    let response ={
    body:{
    name:"Appointment Issued",
    intro:"You have Appointmein in 10 min",
    table:{
    data:[{
    item:'New Appointment',
    description:`There is a Appointment`,
    }]},
    outro:"Looking Forward to do more business"
    }
    }
    
    let mail = MailGenerator.generate(response);
    
    let message ={
    from:process.env.TS_GMAIL,
    to: email,
    subject:`New Appointment From Store`,
    text:`Hi ${name}, This Is Your Email for new Appointment Meeting`,
    html:mail,
    }
    
    transporter.sendMail(message).then(()=>{
    console.log("Notification for Job Is Send !!");       
    }).catch(e=>{
    console.log(e);
    })
   
}

//Okay Tested Email Is Sending


