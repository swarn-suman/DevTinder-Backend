const mongoose = require('mongoose')

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

const User = mongoose.model('User',userSchema)

module.exports = User