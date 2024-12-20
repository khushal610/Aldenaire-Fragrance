import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaMinus,FaPlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";

function Cart() {

  const [cartData, setCartData] = useState([]);
  let newPrice = 0;
  const navigate = useNavigate();
  let totalAmount = 0;
  

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const token = window.localStorage.getItem('token');
  const fetchUserInfo = async () => {
    if (token) {
      const decodeToken = jwtDecode(token);
      const email = decodeToken.email;
      try {
        const cartInfo = await axios.post('http://localhost:3000/api/get-cart-data', { email });
        console.log(cartInfo.data.data);
        setCartData(cartInfo.data.data);
      } catch (error) {
        console.log(error);
        // alert("Your cart is empty");
      }
    }
  };

  const increaseQuantity = (index) => {
    setCartData(prevCartData => {
      const updatedCart = [...prevCartData];
      updatedCart[index].quantity += 1;
      
      newPrice = updatedCart[index].productInfo.productPrice * updatedCart[index].quantity;
      // window.globalPrice = newPrice;

      console.log(updatedCart[index].quantity);
      console.log(newPrice);
      return updatedCart;
    });
  };

  const decreaseQuantity = (index) => {
    setCartData(prevCartData => {
      const updatedCart = [...prevCartData];
      if (updatedCart[index].quantity > 1) {
        updatedCart[index].quantity -= 1;
      
        updatedCart[index].productInfo.productPrice *= updatedCart[index].quantity;
        // window.globalPrice = newPrice;

        console.log(updatedCart[index].quantity);
      }
      return updatedCart;
    });
  };

  const deleteCartItem = async(element) => {
    try {
      const decodeToken = jwtDecode(token);
      const email = decodeToken.email;
      console.log(email);
      const productId = element.productInfo.productId;
      console.log(productId);
      const result = await axios.post('http://localhost:3000/api/delete-cart-items',{email,productId})
      .catch((err) => console.log(err));
      console.log(result);
      if(result){
        alert("Items Removed");
        fetchUserInfo();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const redirectShop = () => {
    navigate("/shop-products")
  }

  const redirectOrderForm = () => {
    navigate("/order-form");

  }

  return (
    <div className='py-10'>
      <div className="mx-auto flex max-w-3xl flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2">
        <h2 className="text-3xl font-bold">Your cart</h2>
        <p className="mt-3 text-sm font-medium text-gray-700">
          Here are the items you have added to your cart.
        </p>
        <ul className="flex flex-col divide-y divide-gray-200">
          {cartData.length > 0 ?
            cartData.map((element, index) => (
              <li key={index} className="flex flex-col py-6 sm:flex-row sm:justify-between">
                <div className="flex w-full space-x-2 sm:space-x-4">
                  <img
                    className="h-20 w-20 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-32 sm:w-32"
                    src={element.productInfo.productImgUrl} 
                    alt={"Not Available"} 
                  />
                  <div className="flex w-full flex-col justify-between pb-4">
                    <div className="flex w-full justify-between space-x-2 pb-2">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                          {element.productInfo.productName}
                        </h3>
                        <div className='flex gap-3'>
                          <button onClick={() => decreaseQuantity(index)} className='border border-black rounded-sm px-3 hover:text-white hover:bg-black transition-all duration-200'><FaMinus /></button>
                          <button className='border border-black rounded-sm py-2 px-4' disabled>{element.quantity}</button>
                          <button onClick={() => increaseQuantity(index)} className='border border-black rounded-sm px-3 hover:text-white hover:bg-black transition-all duration-200'><FaPlus /></button>
                        </div>
                      </div>
                      <div className="text-right">
                        {/* <p className="text-lg font-semibold">₹{element.productInfo.productPrice}</p>  */}
                        <p className="text-lg font-semibold">₹{element.productInfo.productPrice}</p> 
                      </div>
                    </div>
                    <span className='text-transparent pointer-events-none' disabled>{
                        totalAmount = totalAmount + Number(element.productInfo.productPrice)
                      }</span>
                    <div className="flex divide-x text-sm">
                      <button
                        type="button"
                        className="flex items-center space-x-2 px-2 py-1 pl-0"
                        onClick={() => deleteCartItem(element)}
                        >
                        <span className='flex items-center'><MdDeleteOutline className='text-xl' /> Remove</span>
                      </button>
                      {/* <button type="button" className="flex items-center space-x-2 px-2 py-1">
                        <span>Add to favorites</span>
                      </button> */}
                      
                    </div>
                  </div>
                </div>
              </li>
            ))
           : (
            <p>Your cart is empty.</p>
          )}
        </ul>
        <div className="space-y-1 text-right">
          <p>
            Total amount:<span className="font-semibold"> ₹{totalAmount}
            </span>
          </p>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={redirectShop}
            className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
            Back to shop
          </button>
          {cartData.length > 0 ? 
                <button
                type="button"
                onClick={redirectOrderForm}
                className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                Checkout
              </button>
              : null
          }
          
        </div>
      </div>
    </div>
  );
}

export default Cart;