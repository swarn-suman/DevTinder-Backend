const express = require('express');
const app =express();

const dbConnect = require('./config/database')

dbConnect()
   .then(()=>{
    console.log("DB connected successfully")

    app.listen(7777,()=>{
    console.log('App is running at port 7777')
})
   })

   .catch((err)=>{
    console.log("Db not connected")
   })



