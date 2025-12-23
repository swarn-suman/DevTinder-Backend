const express = require('express');
const app =express();

const {adminAuth, userAuth} = require('./middlewares/auth');

app.use("/admin", adminAuth)
app.use("/user", userAuth)

app.get("/admin/getAllUsers",(req,res)=>{
    res.send('All Users Sent')
})

app.get("/admin/deleteOneUser",(req,res)=>{
    res.send('One User Deleted')
})

app.get("/user/getAllProducts",(req,res)=>{
    res.send('All Products Sent')
})

app.get("/user/deleteOneProduct",(req,res)=>{
    res.send('One Product Deleted')
})



app.listen(7777,()=>{
    console.log('App is running at port 7777')
})