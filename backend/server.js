const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('./models/user-model');
const productModel = require('./models/product-model');
const userCartModel = require("./models/user-cart-model");
const contactUsModel = require("./models/contact-model");
const orderModel = require("./models/order-model");
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;  // Set default port
const JWT_SECRET = process.env.TOKEN_SECRET;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send("Home");
});


app.post('/', async (req, res) => {
  try {
    const { username, email, password, contact, address } = req.body;
    const existedUser = await userModel.findOne({ email });

    if (existedUser) {
      return res.status(400).send({ error: 'Email is already registered.' });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    await userModel.create({
      username,
      email,
      password: encryptedPassword,
      contact,
      address
    });

    res.status(200).send("User Created");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});


app.post('/api/update-user-profile', async (req, res) => {
  try {
    const { userName, userEmail, contact, address } = req.body;
    await userModel.updateOne(
      { email: userEmail },
      { $set: { username: userName, contact: contact, address: address } }
    );
    return res.status(200).send({ message: "User Profile Updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Something went wrong" });
  }
});



app.post('/api/get-userName',async (req,res) => {
  try{
    const {email} = req.body
    const findUserName = await userModel.findOne({email},{_id:0,username:1})
    if(!findUserName){
      return res.status(400).send({error:"Username not found"});
    }
    res.status(200).send({data:findUserName.username});
  }catch(err){
    console.log(err);
  }
})


// working upon the user and admin login
app.post('/api/login-user', async (req, res) => {
  try {
    const { email, password ,userType ,secretKey } = req.body;
    const user = await userModel.findOne({ email });

    if(!userType){
      return res.status(400).send({error:"User Type is not define"});
    }
    if (userType === "Admin" && secretKey !== "perfume") {
      return res.status(400).send({ error: "Invalid Secret Key" });
    }
    if (!user) {
      return res.status(400).send({ error: "Please register before login" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      if(userType === "User"){
        const token = jwt.sign(
          { 
            id: user._id,
            email: user.email, 
            userType 
          },
          JWT_SECRET,
          {expiresIn:"7d"}
        );
        return res.status(200).json({ status: "ok", data: token,userType,email }); //username 
      }
      else if(userType === "Admin"){
        const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
            userType,
            secretKey
          },
          JWT_SECRET,
          {expiresIn:"1d"}
        );
        return res.status(200).json({ status: "ok", data: token,userType,email,secretKey });
      }
    } else {
      return res.status(400).json({ status: "error", error: "Invalid Password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});


app.post('/user-logged',async(req,res) => {
    const {token} = req.body;
    try {
      const user = jwt.verify(token,process.env.JWT_SECRET);
      const useremail = user.email;
      userModel.findOne({ email:useremail })
      .then((data) => {
          res.send({status:"ok",data:data});
      })
      .catch((error)  => {
          res.send({status:"error",data:error});
      })

    } catch (error) {
        console.log(error)
    }
})


app.post('/api/add-products',async(req,res) => {
    try {
      const {productID,productName,productImgUrl,productPrice,productDescription} = req.body
      // const existedProduct = await productModel.find({productID})
      // if(existedProduct){
      //   return res.status(400).send({error:"Product Id or product is alerady Exist"});
      // }
      await productModel.create({
        productID,
        productName,
        productImgUrl,
        productPrice,
        productDescription
      })
      res.status(200).send({data:"Product Added"})
    } catch (error) {
      console.log(error);
    }
})


app.delete('/api/delete-products/:productID', async (req, res) => {
  try {
    const { productID } = req.params;
    const deleteProduct = await productModel.deleteOne({ productID });

    if (deleteProduct.deletedCount === 0) {
      return res.status(400).send({ error: "Product Not Found" });
    }
    return res.status(200).send({ data: "Product Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "An error occurred while deleting the product" });
  }
});



app.get('/api/get-products',async(req,res) => {
    try {
      const readData = await productModel.find({ });
      res.status(200).send(readData);
    } catch (error) {
      console.log(error)
    }
})

app.get('/api/get-users',async(req,res) => {
    try {
      const userInformation = await userModel.find({ });
      res.status(200).send(userInformation);
    } catch (error) {
      console.log(error)
    }
})


app.post('/api/sendOTP',async(req,res) => {
  try {
    const { verifyEmail } = req.body
    const checkEmailExist = await userModel.findOne({ email:verifyEmail })
    if(!checkEmailExist){
      return res.status(400).send({ error:"Email is not registered" });
    }

    const auth = nodemailer.createTransport({
        service:'gmail',
        secure:true,
        port:465,
        auth:{
            user:"pcability610@gmail.com",
            pass:process.env.EMAIL_SERVICE_PASSWORD
        }
    })
    const otp = Math.floor(1000 + Math.random() * 9000);
    const receiver = {
        from:"pcability610@gmail.com",
        to:verifyEmail,
        subject:"Reset Password",
        text:`To reset your password, Your OTP is : ${otp}`
    }

    auth.sendMail(receiver,(error,emailResponse) => {
      if(error){
        return error;
      }
      console.log("Success");
      console.log(otp);
      res.status(200).send({ data:otp });
    })

    
  } catch (error) {
    console.log(error)
  }
})



app.post('/api/reset-password',async(req,res) => {
    const {verifyEmail,resetPassword} = req.body
    try {
      const newHashedPassword = await bcrypt.hash(resetPassword,10);
      const result = await userModel.updateOne({ email:verifyEmail },{ $set:{password:newHashedPassword} });    
      if (result.matchedCount === 0) {
        return res.status(400).send({ error: "Email not found. Password unchanged." });
      }

      if (result.modifiedCount === 0) {
          return res.status(400).send({ error: "Password update failed. Please try again." });
      }

      return res.send("Password changed successfully");
    } catch (error) {
      console.log(error);
    }
})


app.post('/api/get-cart-data', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send({ error: "Email is required" });
    }

    const getCartData = await userCartModel.find({ 'userInfo.email': email });

    if (!getCartData || getCartData.length === 0) {
      return res.status(404).send({ error: "Cart data not found or cart is empty" });
    }

    return res.status(200).send({ data: getCartData });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server error while fetching cart data" });
  }
});

app.post('/api/get-cart-user-info',async(req,res) => {
  try {
    const {email} = req.body
    const findUser = await userModel.findOne({email},{username:1,email:1});
    if(!findUser){
      return res.status(400).send({error:"User not found"});
    }
    return res.status(200).send({data:findUser});
  } catch (error) {
    console.log(error);
  }
})


app.post('/api/add-to-cart', async (req, res) => {
  try {
      const { productId, productName, productPrice, productImgUrl, userId, username, email, quantity } = req.body;

      if(!productId){
        return res.status(400).send({error:"Product Not Found"});
      }
      else if(productId){
        const newCartItem = new userCartModel({
          productInfo: {
              productId,
              productName,
              productPrice,
              productImgUrl,
          },
          userInfo: {
              userId,
              username,
              email,
          },
          quantity,
        });
        await newCartItem.save();
        res.status(200).json({ message: 'Product added to cart successfully!' });
      }
      else{
        await userCartModel.updateOne({'productInfo.productId':productId},{$inc:{quantity:1}});
        res.status(200).send({message:"Product added to cart successfully!"});
      }      

  } catch (err) {
      res.status(500).json({ message: 'Failed to add product to cart' });
  }
});


app.post('/api/delete-cart-items',async(req,res) => {
  try {
    const {email,productId} = req.body
    const deletedItem = await userCartModel.deleteOne({'userInfo.email':email,'productInfo.productId':productId});
    if(!deletedItem) {
      return res.status(400).send({error:"Product not found"});
    }
    res.status(200).send({status:"ok",data:deletedItem});
  } catch (error) {
    console.log(error);
  }
})



app.post('/api/user-profile-details',async(req,res) => {
    try {
      const {email} = req.body
      const userInfo = await userModel.find({email});
      if(!userInfo){
        return res.status(400).send({err:"userdata not found"});
      }
      res.status(200).send({ userInfo });
    } catch (error) {
      console.log(error);
    }
});


app.post('/api/contact-us',async(req,res) => {
    try {
      const {username,email,contact,message} =  req.body
      
      await contactUsModel.create({
        username,
        email,
        contact,
        message
      });
      res.status(200).send("Contact us form submitted");

    } catch (error) {
      res.status(500).send("Internal Server Problem");
      console.log(error);
    }
});


app.get('/api/get-contact-query-details',async(req,res) => {
  try {
    const contactResult = await contactUsModel.find({ });
    if(!contactResult) {
      return res.status(400).send("No Data Found");
    }
    res.status(200).send(contactResult);
  } catch (error) {
      console.log(error);
  }
})


app.post('/api/create-order', async (req, res) => {
  try {
      const { username, email, products, contact, location, paymentType } = req.body;

      const createOrder = new orderModel({
        username,
        email,
          orderInfo: products.map((product) => ({
              productName: product.productName,
              productPrice: product.productPrice,
              productImgUrl: product.productImgUrl,
              quantity: product.quantity
          })),
          contact,
          location,
          paymentType
      });

      await createOrder.save();

      const auth = nodemailer.createTransport({
        service:'gmail',
        secure:true,
        port:465,
        auth:{
            user:"pcability610@gmail.com",
            pass:process.env.EMAIL_SERVICE_PASSWORD
        }
      })

      let totalPrice = products.reduce((total, product) => 
        total + (product.productPrice * product.quantity), 0
      );
  
      const orderDetailsTable = `
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px;">Product Name</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Image</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
            </tr>
            ${products.map(product => `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">${product.productName}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">
                <img src="${product.productImgUrl}" alt="${product.productName}" style="width: 50px; height: 50px;">
              </td>
              <td style="border: 1px solid #ddd; padding: 8px;">${product.quantity}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${product.productPrice * product.quantity}</td>
              </tr>
              `).join('')}
              <tr>
              <td colspan="3" style="border: 1px solid #ddd; padding: 8px; text-align: right;"><strong>Total Amount:</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>${totalPrice}</strong></td>
              </tr>
              </table>`;

      const receiver = {
          from:"pcability610@gmail.com",
          to:email,
          subject:"Order Recipt",
          html:`
                <p>
                  Dear Customer,<br />
                  Thank you for your recent purchase from Aldenaire Fragrance, your trusted online destination for quality perfumes. We are delighted to provide you with a fragrance experience that embodies elegance and sophistication. Your support fuels our passion for creating exceptional scents, and we're here to ensure your satisfaction. If you need any assistance, please don't hesitate to reach out. We look forward to serving you again!
                </p>
                <h2>Order Confirmation</h2>
                <p><strong>Username:</strong> ${username}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Contact No:</strong> ${contact}</p>
                <p><strong>Location:</strong> ${location}</p>
                <p><strong>Payment Type:</strong> ${paymentType}</p>
                <p style="color:red"><strong>Payment Status : Pendding</strong></p>
                <h3>Order Information:</h3>
                ${orderDetailsTable}
                <p>Warm regards,</p>
                <p>The Aldenaire Fragrance Team</p>
                `
      }

      auth.sendMail(receiver,(error,emailResponse) => {
        if(error){
          return error;
        }
        console.log("Order Receipt Sent Successfully");
        // console.log(receiver);
        res.status(200).send({ data:"Order Receipt sent to email" });
      })

      res.status(200).json({ message: "Order placed successfully" });

  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to place the order" });
  }
});


app.post('/api/get-order-data',async(req,res) => {
  try {
    const { email } = req.body
    if(!email){
      return res.status(400).send("Email not registered");
    }
    
    const getOrderData = await orderModel.find({email});
    if(!getOrderData) {
      return res.status(400).send({error:"Order Data not found"});
    }

    return res.status(200).send({ data:getOrderData });
  } catch (error) {
    console.log(error);
  }
})


app.post('/api/delete-cart-after-order', async (req, res) => {
  try {
      const { email } = req.body;
      
      if (!email) {
          return res.status(400).send({ error: "Email is required" });
      }

      const deletedCartDataAfterOrder = await userCartModel.deleteMany({ 'userInfo.email': email });

      if (deletedCartDataAfterOrder.deletedCount === 0) {
          return res.status(400).send({ error: "Your Cart is already empty or no items found" });
      }

      return res.status(200).send({ data: "Cart items removed and order placed successfully" });
  } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Server error occurred" });
  }
});


app.post('/api/deleteUserAccount',async(req,res) => {
  try {
    const {email} = req.body

    const deleteUser = await userModel.deleteOne({ email });

    if(!deleteUser) {
      return res.status(400).send({error:"email not found"});
    }
    return res.status(200).send({ data:"user account deleted" });
  } catch (error) {
    console.log(error);
  }
});


app.post('/api/deleteUserOrder-afterProfileDelete',async(req,res) => {
  try {
    const {email} = req.body
    const deleteUserOrder = await orderModel.deleteMany({ email });
    if(!deleteUserOrder){
      return res.status(400).send({ message:"No Order Placed" });
    }

    const auth = nodemailer.createTransport({
      service:'gmail',
      secure:true,
      port:465,
      auth:{
          user:"pcability610@gmail.com",
          pass:process.env.EMAIL_SERVICE_PASSWORD
      }
    })
    const receiver = {
        from:"pcability610@gmail.com",
        to:email,
        subject:"Order Canceled Due to Account Deletion",
        html:`<p>
                Dear Customer,<br />
                We wanted to inform you that your recent order with Aldenaire Fragrance has been canceled because your account was deleted from our platform. Without an active account, we are unable to process orders or provide further assistance. If this was unexpected or if you'd like to place a new order, please feel free to create a new account on our website. Thank you for your understanding, and we look forward to serving you in the future.
              </p>
              <p>
                Best regards,<br />
                The Aldenaire Fragrance Team
              </p>
            `
    }

    auth.sendMail(receiver,(error,emailResponse) => {
      if(error){
        return error;
      }
      res.status(200).send({ data:"Account deleted" });
    })

    return res.status(200).send({ status:"ok",data:"User orders are also deleted" });
  } catch (error) {
    console.log(error);
  }
});


// delete specific product from order
app.post('/api/delete-product-from-order', async (req, res) => {
  try {
    const { email, id } = req.body;
    const order = await orderModel.findOne({ email, 'orderInfo._id': id });
    if (!order) {
      return res.status(400).send({ error: "Order or product not found" });
    }

    if (order.orderInfo.length === 1) {
      const deletedItem = await orderModel.deleteOne({ _id: order._id });
      return res.status(200).send({ data:deletedItem,message: "Order deleted successfully" });
    }

    const deleteProductFromOrder = await orderModel.updateOne(
      { email, 'orderInfo._id': id },
      { $pull: { orderInfo: { _id: id } } }
    );

    if (deleteProductFromOrder.modifiedCount === 0) {
      return res.status(400).send({ error: "Product not found in orderInfo" });
    }
    return res.status(200).send({ data: "Product deleted successfully from order" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "An error occurred while deleting the product" });
  }
});


app.post('/api/get-order-details',async(req,res) => {
  try {
    const { email } = req.body
    const orderData = await orderModel.findOne({ email });
    if(!orderData){
      return res.status(400).send({ error:"There is no order placed from this user" });
    }
    return res.status(200).send({ data:orderData });
  } catch (error) {
    console.log(error);
  }
})


app.post('/api/send-deleted-order-information', async (req, res) => {
  try {
    const { email,id,productName,productPrice,quantity,productImgUrl } = req.body;

    const auth = nodemailer.createTransport({
      service:'gmail',
      secure:true,
      port:465,
      auth:{
          user:"pcability610@gmail.com",
          pass:process.env.EMAIL_SERVICE_PASSWORD
      }
    })
    const receiver = {
        from:"pcability610@gmail.com",
        to:email,
        subject:"Your Order Has Been Modified",
        html:`<p>
                Dear Customer,<br>
                We want to inform you that the product <strong>${productName}</strong> has been successfully removed from your recent order. <br />Here are the details of the deleted product:<br />
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <th style="border: 1px solid #ddd; padding: 8px;">Product Name</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Image</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">${productName}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">
                      <img src="${productImgUrl}" alt="${productName}" style="width: 50px; height: 50px;">
                    </td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${quantity}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${productPrice * quantity}</td>
                  </tr>
                </table><br />
                If you have any questions or need further assistance regarding your order, please feel free to reach out to our customer service team. Thank you for choosing Aldenaire Fragrance!
                <p>Warm regards,<br>
                The Aldenaire Fragrance Team
                </p>
              </p>
            `
    }

    auth.sendMail(receiver,(error,emailResponse) => {
      if(error){
        return error;
      }
      console.log("Account Deleted");
      res.status(200).send({ data:"Account deleted" });
    })

  } catch (error) {
    console.log("Server Error:", error);
    res.status(500).send({ error: "An error occurred on the server" });
  }
});


app.post('/api/delete-user-from-admin',async(req,res) => {
  try {
    const {userDeleteEmail} = req.body
    const userDeleted = await userModel.deleteOne({ email:userDeleteEmail });
    if(!userDeleted){
      return res.status(400).send({ error:"User not found" });
    }
    return res.status(200).send({ message:"User Deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});