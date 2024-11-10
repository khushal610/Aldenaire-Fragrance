const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_PATH)
.then(() => { console.log("Order Table MongoDB connection successful") })
.catch((err) => { console.log("error to connect with server") })

const orderSchema = mongoose.Schema({
    username: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required:true
    },
    orderInfo: [
        {
            productName: String,
            productPrice: String,
            productImgUrl: String,
            quantity: String
        }
    ],
    contact: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    paymentType: {
        type: String,
        required: true
    }
},{timestamps:true});

const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;
