const mongoose = require('mongoose')
require('dotenv').config();

mongoose.connect(process.env.MONGODB_PATH)
.then(() => { console.log("User-cart table connected with database") })
.catch((err) => { console.log(err) });

const userCartSchema = new mongoose.Schema({
    productInfo: {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required:true },
        productName: String,
        productPrice: String,
        productImgUrl: String,
    },
    userInfo: {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required:true },
        username:String,
        email:String,
    },
    quantity: {
        type: Number,
        default: 1,
        required:true
    }
});

const userCartModel = mongoose.model("Cart", userCartSchema);

module.exports = userCartModel;