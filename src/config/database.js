const mongoose = require('mongoose')

const dbConnect = async()=>{
    await mongoose.connect('mongodb+srv://swarnsuman_test:swarnBulkMail@cluster0.l4mvirb.mongodb.net/DevTinder')
}

module.exports = dbConnect;







