const mongoose = require('mongoose')
require('dotenv').config();

mongoose.connect(process.env.MONGODB_PATH)
.then(() => { console.log("Admin MongoDB Connection Successful") })
.catch((err) => { console.log("error to connect with server") })

const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true
    },
    contact:{
        type:String,
        require:true
    }
});

const adminModel = mongoose.model("AdminTable",adminSchema);
module.exports = adminModel;