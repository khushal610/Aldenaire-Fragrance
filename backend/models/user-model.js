const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1/demo")
.then(() => { console.log("MongoDB connection successful") })
.catch((err) => { console.log("error to connect with server") })

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
    },
    contact:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    }
})

const userModel = mongoose.model("User",userSchema);
module.exports = userModel;