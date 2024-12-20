import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import './user.css';
import { MdDelete, MdDoneOutline } from "react-icons/md";
import { IoTimerOutline } from "react-icons/io5";
import { FcCancel } from "react-icons/fc";

function UserOrders() {
  const [orderData, setOrderData] = useState([]);
  const [whichOrderViewStatus, setWhichOrderViewStatus] = useState(false);
  const token = window.localStorage.getItem('token');
  const decodeToken = jwtDecode(token);
  const email = decodeToken.email;

  const handleToShowOrderData = async () => {
    try {
      const orderDetails = await axios.post('http://localhost:3000/api/get-order-data', { email });
      setOrderData(orderDetails.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleToShowOrderData();
  }, []);

  const deleteProductFromOrder = async (element, order) => {
    try {
      const confirmDelete = window.confirm('Do you really want to remove this product from the order?');
      if (confirmDelete) {
        const id = order._id;
        const deleteProduct = await axios.post('http://localhost:3000/api/delete-product-from-order', { email, id });
        if (deleteProduct.data && deleteProduct.data.data) {
          alert('Product deleted successfully');

          // Update UI after deletion
          const updatedOrderData = orderData.map((orderGroup) =>
            orderGroup._id === element._id
              ? { ...orderGroup, orderInfo: orderGroup.orderInfo.filter((o) => o._id !== order._id) }
              : orderGroup
          );
          setOrderData(updatedOrderData);

          // Send email notification to user
          const { productName, productPrice, quantity, productImgUrl } = order;
          await axios.post('http://localhost:3000/api/send-deleted-order-information', {
            email,
            id,
            productName,
            productPrice,
            quantity,
            productImgUrl,
          });
        }
      } else {
        alert('Process aborted');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleOrderViewStatus = () => {
    setWhichOrderViewStatus(!whichOrderViewStatus);
  };

  return (
    <div className='w-full relative'>
      <div className='order-table-container overflow-x-scroll'>
        <table className='table1 mb-12'>
          <thead>
            <tr className='tr1'>
              <th className='th1'>Product Name</th>
              <th className='th1'>Product Image</th>
              <th className='th1'>Quantity</th>
              <th className='th1'>Price</th>
              <th className='th1'>Location</th>
              <th className='th1'>Payment Status</th>
              <th className='th1'>Date</th>
              {!whichOrderViewStatus && <th className='th1'>Delete</th>} {/* Delete column shown only for "Pending" data */}
            </tr>
          </thead>
          <tbody>
            {
              (whichOrderViewStatus
                ? orderData.filter((element) =>
                    ["Received", "Cancelled"].includes(element.paymentStatus)
                  )
                : orderData.filter((element) => element.paymentStatus === "Pending")
              ).map((element, index) =>
                element.orderInfo.map((order, orderIndex) => (
                  <tr className="tr1" key={`${index}-${orderIndex}`}>
                    <td className="td1">{order.productName}</td>
                    <td className="td1">
                      <img src={order.productImgUrl} alt="Product" width={"30%"} />
                    </td>
                    <td className="td1">{order.quantity}</td>
                    <td className="td1">{order.productPrice}</td>
                    <td className="td1">{element.location}</td>
                    <td className="td1">
                      {element.paymentStatus === "Pending" ? (
                        <div className='flex items-center gap-1 text-red-500 font-medium'>
                          <IoTimerOutline /> Pending
                        </div>
                      ) : element.paymentStatus === "Received" ? (
                        <div className='flex items-center gap-1 text-green-500 font-medium'>
                          <MdDoneOutline /> Received
                        </div>
                      ) : (
                        <div className='flex items-center gap-1 text-red-500 font-medium'>
                          <FcCancel /> Cancelled
                        </div>
                      )}
                    </td>
                    <td className="td1">{new Date(element.createdAt).toLocaleDateString()}</td>
                    {!whichOrderViewStatus && (
                      <td className="td1">
                        <MdDelete
                          className='cursor-pointer'
                          onClick={() => deleteProductFromOrder(element, order)}
                        />
                      </td>
                    )}
                  </tr>
                ))
              )
            }
          </tbody>
        </table>
      </div>
      <div className='w-full p-3 bg-slate-50 border border-black absolute bottom-0'>
        <button
          className='speacial-btn2 py-2 px-4'
          onClick={toggleOrderViewStatus}
        >
          {whichOrderViewStatus
            ? "View Pending Orders"
            : "View Received/Cancelled Orders"}
        </button>
      </div>
    </div>
  );
}

export default UserOrders;
