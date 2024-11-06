import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import './user.css';
import { MdDelete } from "react-icons/md";

function UserOrders() {
  const [orderData, setOrderData] = useState([]);
  const token = window.localStorage.getItem('token');
  const decodeToken = jwtDecode(token);
  const email = decodeToken.email;

  const handleToShowOrderData = async () => {
    try {
      const orderDetails = await axios.post('http://localhost:3000/api/get-order-data', { email });
      setOrderData(orderDetails.data.data);
      // console.log(orderDetails.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleToShowOrderData();
  }, []);

  const deleteProductFromOrder = async (element, order, orderIndex) => {
    try {
      const productName = order.productName;
      const productPrice = order.productPrice;
      const quantity = order.quantity;
      const productImgUrl = order.productImgUrl;
      const confirmDelete = window.confirm('Do you really want to remove this product from the order?');
      if (confirmDelete) {
        const id = order._id;
        console.log(id);
        const deleteProduct = await axios.post('http://localhost:3000/api/delete-product-from-order', { email, id })
          .catch((err) => { console.log(err) });

        if (deleteProduct.data && deleteProduct.data.data) {
          alert('Product deleted successfully');
          console.log(deleteProduct.data);
          // Send a new order receipt to the user
          const sendNewOrderReceipt = await axios.post('http://localhost:3000/api/send-deleted-order-information', { email,id,productName,productPrice,quantity,productImgUrl })
            .catch((err) => { console.log(err) });
        }
      } else {
        alert('Process aborted');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-full'>
      <div className='order-table-container overflow-x-scroll'>
        <table className='table1'>
          <thead>
            <tr className='tr1'>
              <th className='th1'>Product Name</th>
              <th className='th1'>Product Image</th>
              <th className='th1'>Quantity</th>
              <th className='th1'>Price</th>
              <th className='th1'>Location</th>
              <th className='th1'>Date</th>
              <th className='th1'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((element, index) => (
              element.orderInfo.map((order, orderIndex) => (
                <tr className="tr1" key={`${index}-${orderIndex}`}>
                  <td className="td1">{order.productName}</td>
                  <td className="td1">
                    <img src={order.productImgUrl} alt="Product" width={"30%"} />
                  </td>
                  <td className="td1">{order.quantity}</td>
                  <td className="td1">{order.productPrice}</td>
                  <td className="td1">{element.location}</td>
                  <td className="td1">{new Date(element.createdAt).toLocaleDateString()}</td>
                  <td className="td1">
                    <MdDelete className='cursor-pointer' onClick={() => deleteProductFromOrder(element, order, orderIndex)} />
                  </td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserOrders;
