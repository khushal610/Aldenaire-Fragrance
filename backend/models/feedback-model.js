const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_PATH)
.then(() => { console.log("Feedback Table MongoDB connection successful") })
.catch((err) => { console.log("error to connect with server") })

const feedbackSchema = mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    rate:{
        type:String,
        require:true
    },
    suggestion:{
        type:String,
        default:"No suggestion provided",
        require:true
    }
});


const feedbackModel = mongoose.model("Feedback",feedbackSchema);
module.exports = feedbackModel;