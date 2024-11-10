const mongoose = require('mongoose')
require('dotenv').config();

mongoose.connect(process.env.MONGODB_PATH)
.then(() => {
    console.log("MongoDB Database connection successful");
})
.catch((e) => {
    console.log(e);
})


const productSchema = new mongoose.Schema({
    productID:{
        type:Number,
        required:true,
        unique:true
    },
    productName:{
        type:String,
        required:true
    },
    productImgUrl:{
        type:String,
        required:true 
    },
    productPrice:{
        type:String,
        required:true 
    },
    productDescription:{
        type:String,
        required:true
    }
})


const productModel = mongoose.model("product",productSchema);
module.exports = productModel;
