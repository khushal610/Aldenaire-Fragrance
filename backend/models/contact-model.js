const mongoose = require('mongoose')
require('dotenv').config();

mongoose.connect(process.env.MONGODB_PATH)
.then(() => { console.log("Contact Form MongoDB connection successful") })
.catch((err) => { console.log("error to connect with server") })

const contactUsSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

const contactUsModel = mongoose.model("contactUs",contactUsSchema);
module.exports = contactUsModel;