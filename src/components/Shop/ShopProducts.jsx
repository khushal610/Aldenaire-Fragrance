import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdCurrencyRupee } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

function ShopProducts() {
  const [productData, setProductData] = useState([]);
  const [userData,setUserData] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token'); 
  const fetchProductData = async () => {
    try {
      const result = await axios.get("http://localhost:3000/api/get-products");
      setProductData(result.data);

    if (token) {
      const decodedToken = jwtDecode(token);
      const email = decodedToken.email; 
      const userDetails = await axios.post("http://localhost:3000/api/get-cart-user-info",{email});
      // console.log(userDetails.data.data);
      setUserData(userDetails.data.data);
    } else {
      alert("Login before shopping");
      return;
    }
      // console.log(result.data);
      // console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProductData();
  }, []);

  const handleAddToCart = async (product) => { 
    try {
      if(!token){
        alert('Please login first');
        navigate('/login');
      }
      const cartItem = {
        productId: product._id,
        productName: product.productName,
        productPrice: product.productPrice,
        productImgUrl: product.productImgUrl,
        userId: userData._id,
        username: userData.username,
        email: userData.email,        
        quantity: 1, 
      };
      // console.log(cartItem);

      const response = await axios.post("http://localhost:3000/api/add-to-cart", cartItem);
      console.log(response.data);
      if (response.status === 200) {
        alert('Product added to cart successfully!');
      }
    } catch (err) {
      console.error('Failed to add product to cart:', err);
    }
  };

  return (
    <div className="p-10">
      <div className="flex gap-4 items-center">
        <div>
          <input 
            type="text" 
            placeholder="Search..."
            className="p-2 shadow-md outline-none rounded-md"
          />
        </div>
        <div>
          Quantity: 
          <select className="shadow-md">
            <option value="35ml">35ml</option>
            <option value="150ml">150ml</option>
            <option value="200ml">200ml</option>
            <option value="35ml">35ml</option>
          </select>
        </div>
      </div>
      <div className="pt-8 product-container flex flex-wrap items-center justify-center gap-4">
        {productData.map((element, index) => (
          <div className="w-[300px] rounded-md border" key={index}>
            <img
              src={element.productImgUrl}
              className="h-[200px] w-full rounded-t-md object-cover"
            />
            <div className="p-4">
              <h1 className="inline-flex items-center text-lg font-semibold">
                {element.productName}
              </h1>
              <p className="mt-3 text-sm text-gray-600">
                {element.productDescription}
              </p>
              <div className="mt-4 flex items-center">
                <MdCurrencyRupee /> {element.productPrice}
              </div>
              <button
                type="button"
                className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={() => handleAddToCart(element)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopProducts;