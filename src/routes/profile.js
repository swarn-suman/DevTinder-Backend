const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const { validatenewPassword } = require("../utils/validation");
const bcrypt = require("bcrypt");


profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfuly`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch('/profile/edit/password', userAuth, async(req,res)=>{
  try{
      const loggedInUser = req.user
      const {newPassword} = req.body

      validatenewPassword(req)

      const newPasswordHash = await bcrypt.hash(newPassword, 10);
          console.log(newPasswordHash);

      loggedInUser.password = newPasswordHash
      await loggedInUser.save()

      res.json({
      message: `${loggedInUser.firstName}, your password updated successfuly`,
      data: loggedInUser,
    })
    }

    catch(err){
      res.status(400).send("ERROR : " + err.message);
    }
})

module.exports = profileRouter;