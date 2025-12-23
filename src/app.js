const express = require('express');

const app =express();

app.use("/profile",(req,res)=>{
    res.send("WELCOME TO PROFILE PAGE")
})

app.use("/connections",(req,res)=>{
    res.send("YOUR CONNECTIONS !!!!")
})

app.use("/",(req,res)=>{
    res.send("WELCOME TO HOME PAGE")
}) 

app.listen(7777,()=>{
    console.log('App is running at port 7777')
})