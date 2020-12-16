import { Router } from 'next/router';
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { console } from 'window-or-global';
dotenv.config()

const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
      user: process.env.EMAIL_VERIFY_TEST_ID,
      pass: process.env.EMAIL_VERIFY_TEST_PW
  },
  tls: {
      rejectUnauthorized: false
  }
});

const makeVerifyNumber = ()=>{
  let number = Math.floor(Math.random() * 1000000)+100000; 
    if(number>1000000){                                      
       number = number - 100000;                             
    }
    return number
}

export default async(req, res) => {
  

   const number = makeVerifyNumber().toString()
   const emailFromUser = req.body.email
  
  const mailOptions = {
    from: process.env.EMAIL_VERIFY_TEST_ID,
    to: emailFromUser,
    subject: "스테이킹 포켓에서 온 이메일 인증코드입니다.",
    text:`인증코드 : ${number}`
  };

 await smtpTransport.sendMail(mailOptions, (error, responses) =>{
    if(error){
        res.json({msg:error});
    }else{
      res.json({verifyCode:number})
    }
    smtpTransport.close();
});
}
