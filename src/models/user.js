const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLenght: 50
    },

    lastName:{
        type: String,
        required: true,
        minLength: 2,
        maxLenght: 50
    },

    gender: {
        type: String,
        required: true,
        trim: true,
       validate(value) {
            if (!["Male", "Female", "Others"].includes(value)) {
                throw new Error("Not a valid gender (Male , Female and other)")
            }
        }
    },

    age:{
        type: Number,
        min: 18
    },

    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true
    },

    password:{
        type: String
    }
},

{
   timestamps: true
})

    userSchema.methods.getJWT= async function () {
    const user = this;
    const token = await jwt.sign({ _id: this._id }, "secretkey", { expiresIn: "1d" })

    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isValidPassword = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isValidPassword;

}

const User = mongoose.model('User',userSchema)

module.exports = User