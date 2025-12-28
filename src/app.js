const express = require('express');
const app =express();
const dbConnect = require('./config/database');
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())

const authRouter = require('./routes/auth')
app.use('/',authRouter)

const profileRouter = require('./routes/profile')
app.use('/',profileRouter)

const requestRouter = require('./routes/request')
app.use('/',requestRouter)




dbConnect()
  .then(()=>{
    console.log("DB connected successfully")

    app.listen(7777,()=>{
        console.log("server is running at PORT 7777")
    })
  })
  .catch((err)=>{
    console.log(err)
  })



