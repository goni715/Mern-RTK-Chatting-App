//Basic Import
const express = require('express');
const app = new express();
const authRouter = require('./src/routes/AuthRoute');
const userRouter = require('./src/routes/UserRoute');
const convRouter = require('./src/routes/ConversationRoute');
const messageRouter = require('./src/routes/MessageRoute');
const todoRouter = require('./src/routes/TodoRoute');


const bodyParser = require('body-parser');



//Security Middleware Import
const rateLimit = require('express-rate-limit');
const helemet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const morgan = require("morgan");
const cors = require('cors');

//Database Library Import
const mongoose = require('mongoose');


//Security Middleware Implementation
app.use(morgan("dev"));
app.use(cors())
app.use(helemet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())
app.use(cors())

//RequestBodySizeIncrease//Body Parser Implementation
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));




//Request Rate Limit Implementation

const Limiter = rateLimit({
      windowMs: 15 * 60 * 1000,   //15 Minutes
      max: 300000   //Limit each IP to 100 requests per windowMs
})
app.use(Limiter);



//MongoDB(mongoose) Atlas Database Connection
let uri = "mongodb+srv://<username>:<password>@cluster0.m7fozzp.mongodb.net/new-chat-app?retryWrites=true&w=majority";
let option = {user:'mymongodb715', pass:'85035785mongodb',autoIndex:true};


mongoose.connect(uri,option, (error)=>{
      console.log("Connection Success");
      console.log(error);
});




//Managing Back-end Routing// Back-end Routing Implementation
//app.use('/api/v1', router);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/conv', convRouter);
app.use('/api/message', messageRouter);
app.use('/api/todo', todoRouter);



//Undefined Route
app.use('*',(req,res)=>{

      res.status(404).json({status:"Fail", data:"Route Not Found"});
});


module.exports=app;