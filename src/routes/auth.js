const express = require("express");
const authRouter = express.Router();

const { validateSignupData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

//signup a new user
authRouter.post('/signup', async(req,res)=>{
    
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
authRouter.post('/login', async(req,res)=>{
  const {emailId, password} = req.body
  
  try{
    const user = await User.findOne({emailId})

    if(!user){
      throw new Error("Invalid Credentials")
  }

  const isPasswordValid = await user.validatePassword(password)
  if(isPasswordValid){
    //generate token
    const token = await user.getJWT()

    res.cookie("token",token, {expires: new Date(Date.now() + 8 * 3600000)})
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

//logout API
authRouter.post('/logout', async(req,res)=>{
    res.cookie('token',null, {expiresIn: new Date(Date.now())})
    res.send("Logged Out Successfully")
})

module.exports = authRouter;