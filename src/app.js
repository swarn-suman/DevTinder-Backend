const express = require('express');
const app =express();

const dbConnect = require('./config/database');
const User = require('./models/user');

app.use(express.json())

//signup a new user
app.post('/signup', async(req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        res.send("User added successfully")
    }
    catch(err){
        res.status(400).send("Error while saving user")
    }
})

//get details of a single user
app.get('/user',async(req,res)=>{
  const userEmail = req.body.emailId

  try{
    const user = await User.findOne({emailId:userEmail})

    if(user.length === 0){
      res.status(401).send("User not found")
    }
    else{
      res.send(user)
    }
  }

  catch(err){
    res.status(400).send("Error while fetching user")
  }
})

//get details of all the users
app.get('/users', async(req,res)=>{

  try{
    const users = await User.find()
    res.send(users)
  }
  catch(err){
    res.status(400).send("Error while fetching users")
  }
})

//delete a user
app.delete('/user', async(req,res)=>{
  const userId = req.body.userId

  try{
    await User.findByIdAndDelete(userId)
    res.send("User deleted successfully")
  }
  catch(err){
    res.status(400).send("Error while deleting user")
  }
})

//update a user
app.patch('/user', async(req,res)=>{
  const firstname = req.body.firstName
  const data = req.body

  try{
    await User.findOneAndUpdate({ firstName: firstname },data)
     res.send("User updated successfully")
  }
  catch(err){
    res.status(400).send("Error while updating user")
  }
})


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



