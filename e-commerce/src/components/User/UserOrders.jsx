import React, { useEffect,useState } from 'react'
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import './user.css'

function UserOrders() {

    const [orderData,setOrderData] = useState([]);
    const token = window.localStorage.getItem('token');
    const decodeToken = jwtDecode(token);
    const email = decodeToken.email;

    const handleToShowOrderData = async() => {
        try {
          const orderDetails = await axios.post('http://localhost:3000/api/get-order-data',{ email });
          setOrderData(orderDetails.data.data);
          console.log(orderDetails.data.data);
        } catch (error) {
          console.log(error);
        }
      }

    useEffect(() => {
        handleToShowOrderData();
    },[])

  return (
    <div className='w-full'>
        <div className='order-table-container overflow-x-scroll'>
        <table className='table1'>
            <thead>
                <tr className='tr1'>
                    {/* <th className='th1'>Order ID</th> */}
                    <th className='th1'>Username</th>
                    <th className='th1'>Contact</th>
                    <th className='th1'>Product Image</th>
                    <th className='th1'>Product Name</th>
                    <th className='th1'>Quantity</th>
                    <th className='th1'>Price</th>
                    <th className='th1'>Location</th>
                    <th className='th1'>Date</th>
                </tr>
            </thead>
            <tbody>
              {/* there was an logical problem to show the inner data of orderInfo */}
                {/* {orderData.map((element,index) => {
                    return <tr className='tr1' key={index}>
                        <td className='td1'>{element.username}</td>
                        <td className='td1'>{element.contact}</td>
                        <td className='td1'><img src={element.orderInfo[0].productImgUrl} alt="" /></td>
                        <td className='td1'>{element.orderInfo[0].productName}</td>
                        <td className='td1'>{element.orderInfo[0].quantity}</td>
                        <td className='td1'>{element.orderInfo[0].productPrice}</td>
                        <td className='td1'>{element.location}</td>
                        <td className='td1'>{element.createdAt}</td>
                    </tr>
                    })
                } */}
                {orderData.map((element, index) => (
                  element.orderInfo.map((order, orderIndex) => (
                    <tr className="tr1" key={`${index}-${orderIndex}`}>
                      {/* <td className="td1">{element._id}</td> */}
                      <td className="td1">{element.username}</td>
                      <td className="td1">{element.contact}</td>
                      <td className="td1">
                        <img src={order.productImgUrl} alt="Product" />
                      </td>
                      <td className="td1">{order.productName}</td>
                      <td className="td1">{order.quantity}</td>
                      <td className="td1">{order.productPrice}</td>
                      <td className="td1">{element.location}</td>
                      <td className="td1">{element.createdAt}</td>
                    </tr>
                  ))
                ))}
            </tbody>
            </table>
        </div>
    </div>
  )
}

export default UserOrders
