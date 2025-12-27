const express = require('express');
const app =express();

const dbConnect = require('./config/database');
const User = require('./models/user');

const {validateSignupData} = require('./utils/validation')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')


app.use(express.json())
app.use(cookieParser())

//signup a new user
app.post('/signup', async(req,res)=>{
    
    try{
      //validation of the data
      validateSignupData(req)

      //Encrypt the password
      const {firstName, lastName, emailId, password, gender, age} = req.body

      const PasswordHash = await bcrypt.hash(password,10)

      //creating new Instance of User
        const user = new User({
          firstName,
          lastName,
          emailId,
          age,
          gender,
          password: PasswordHash
          })

        await user.save()
        res.send("User added successfully")
    }

        catch (err) {
         res.status(400).send("ERROR: " + err.message);
}
})

//login API
app.post('/login', async(req,res)=>{
  const {emailId, password} = req.body
  
  try{
    const user = await User.findOne({emailId})

    if(!user){
      throw new Error("Invalid Credentials")
  }
  const isPasswordValid = await bcrypt.compare(password, user.password)

  if(isPasswordValid){
    //generate token
    const token = await jwt.sign({_id:user._id},"secretkey")

    res.cookie("token",token)
    res.send("Logged In Successfully")
  }
  else{
    throw new Error("Invalid Credentials")
  }
}
  catch(err){
    res.status(400).send("ERROR: " + err.message);
  }
})

app.get('/profile', async(req,res)=>{
  try{
    const cookies = req.cookies

    const {token} = cookies
    if(!token){
      throw new Error("Invalid Token")
    }

    const decodedMessage = await jwt.verify(token,"secretkey")
    
    const {_id} = decodedMessage

    const user = await User.findById(_id)
    if(!user){
      throw new Error("User not found")
    }
    res.send(user)   
  }
  catch(err){
    res.status(400).send("ERROR: " + err.message);
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



