import React, { useEffect, useState } from 'react'
import { MdDelete,MdDoneOutline } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import axios from 'axios';

function Order() {

  const [orderData,setOrderData] = useState([]);
  const [paymentStatus,setPaymentStatus] = useState('');


  const getOrderData = async() => {
    // alert('clicked');
      try {
          const result = await axios.get('http://localhost:3000/api/get-all-order-data')
          .catch((err) => console.log(err));
          if(result){
            setOrderData(result.data);
            console.log(orderData);
          }
      } catch (error) {
          console.log(error);
      }
  };
  
  useEffect(() => {
      getOrderData();
  },[]);


  const deleteProductFromOrder = async (element, order, orderIndex) => {
    try {
      const productName = order.productName;
      const productPrice = order.productPrice;
      const quantity = order.quantity;
      const productImgUrl = order.productImgUrl;
      const email = element.email;

      const confirmDelete = window.confirm('Do you really want to remove this product from the order?');
      if (confirmDelete) {
        const id = order._id;
        console.log(id);
        const deleteProduct = await axios.post('http://localhost:3000/api/delete-product-from-order', { email, id })
          .catch((err) => { console.log(err) });

        if (deleteProduct.data && deleteProduct.data.data) {
          alert('Product deleted successfully');
          console.log(deleteProduct.data);
          getOrderData();
        }
      } else {
        alert('Process aborted');
      }
    } catch (error) {
      console.log(error);
    }
  };


  const changePaymentStatus = async (e, id, email) => {
    try {
      let verifyConfirmation = confirm("Once you set the Payment status that can't be changed");
      if(verifyConfirmation){
        alert('Payment status changed');
        const newStatus = e.target.value; // Get the selected value
        setPaymentStatus(newStatus); // Update local state (optional)
        console.log(paymentStatus,"Payment Status after the alert");

        const response = await axios.post('http://localhost:3000/api/update-payment-status', {
          id,
          email,
          paymentStatus: newStatus,
        });
          
        if (response.data && response.data.status === "ok") {
          alert("Payment status updated successfully");
          getOrderData(); // Refresh the order data to show the updated status
        }
      }
      else{
        alert('no change in payment status');
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };
  

  return (
    <div className='w-full p-10'>
      <div className='order-table-container overflow-x-scroll'>
        <table className='table1'>
          <thead>
            <tr className='tr1'>
              <th className='th1'>Username</th>
              <th className='th1'>Contact</th>
              <th className='th1'>Product Name</th>
              <th className='th1'>Product Image</th>
              <th className='th1'>Quantity</th>
              <th className='th1'>Price</th>
              <th className='th1'>Location</th>
              <th className='th1'>Payment Status</th>
              <th className='th1'>Date</th>
              <th className='th1'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((element, index) => (
              element.orderInfo.map((order, orderIndex) => (
                <tr className="tr1" key={`${index}-${orderIndex}`}>
                  <td className="td1">{element.username}</td>
                  <td className="td1">{element.contact}</td>
                  <td className="td1">{order.productName}</td>
                  <td className="td1">
                    <img src={order.productImgUrl} alt="Product" width={"30%"} />
                  </td>
                  <td className="td1">{order.quantity}</td>
                  <td className="td1">{order.productPrice}</td>
                  <td className="td1">{element.location}</td>
                  <td className="td1">
                    {
                      element.paymentStatus === "Pending" ? 
                      (
                        <>
                          <div>
                            <select name="PaymentStatus" 
                              onChange={(e) => {
                                setPaymentStatus(element.paymentStatus);
                                changePaymentStatus(e,element._id,element.email);
                              }} 
                              id="">
                              <option value="Pending">Pending</option>
                              <option value="Received">Received</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </div>
                        </>
                      )
                      :
                      (
                        <>
                        <div>
                          {element.paymentStatus === "Received" ? 
                          (
                            <>
                            <p className='flex items-center gap-1 text-green-500 font-medium'><MdDoneOutline /> Received</p>
                            </>
                          )
                          :
                          (
                            <>
                            <p className='flex items-center gap-1 text-red-500 font-medium'><FcCancel /> Cancelled</p>
                            </>
                          )
                          }
                        </div>
                        </>
                      )
                    }
                  </td>
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
  )
}

export default Order
