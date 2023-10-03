const express = require("express")
  var engines = require('consolidate');
  const nodemailer = require('nodemailer')
  
  const app =  express()
  const user = undefined;
  const urlencodedParser = express.urlencoded({extended: false})
  
  app.use(express.static(`${__dirname}`))
  app.engine('html', engines.mustache);
  app.set('view engine', 'html');
  
  async function sendToEmail(messageText){
      let testEmailAccount = await nodemailer.createTestAccount()
  
      const transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure: true, // true for 465, false для остальных портов
        auth: {
           
            user: 'mail.afw@mail.ru', 
            pass: '6wc0RCZrTiT45irHzRGJ' 
      }
      })
  
      let result = await transporter.sendMail({
       
      from: '"Node js" <mail.afw@mail.ru>',
      to: messageText,
      subject: 'Message from Node js',
      text: messageText
       })
      
  }
  
  app.post("/send",urlencodedParser,(req,res)=>{
      let ans = req.body
      sendToEmail(ans.email)
      
  })
  
  app.use("/" , (req,res)=>{
      res.render("index.html")
  })
  
  app.listen(8000 , (req,res)=>{
      console.log("ok")
  })

  