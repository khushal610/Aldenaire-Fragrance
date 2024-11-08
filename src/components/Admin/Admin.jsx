import React, { useEffect, useState } from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './adminStyle.css';
import { jwtDecode } from 'jwt-decode';

function Admin() {

  const [userData,setUserData] = useState('');
  const navigate = useNavigate(); 

  const token = window.localStorage.getItem("token");
  // const decodeToken = jwtDecode(token);
  // const userType = decodeToken.userType;
  // console.log(userType);

  const verify = async() => {
    await axios.post('http://localhost:3000/user-logged',{
      token:window.localStorage.getItem("token")
    })
    .then((res) => { res.json() })
    .then((data) => {
      console.log(data,"userData");
      setUserData({userData:data.data});
    });
  };

  useEffect(() => {
    if(!token) {
      alert('Secured Site Login First');
      navigate('/login');
      return;
    }
    console.log(token);
    verify();
  },[])

  if (!token) { 
    return null; 
  }

  return (
    <div className='flex'>
        <div className='left-admin-panel w-2/12 flex flex-col items-center pt-10'>
          <div className='flex flex-col gap-3 py-3'>
          <Link to="/admin/product">Add Products</Link>
          <Link to="/admin/manage-products">Manage Products</Link>
          <Link to="/admin/orders">Manage Orders</Link>
          <Link to="/admin/users">Manage Users</Link>
          <Link to="/admin/feedback">Feedback</Link>
          <Link to="/admin/contact-query">User Query</Link>
          {/* <Link to="#"></Link> */}
          </div>
        </div>
        <div className='right-admin-panel w-10/12 h-full flex items-center justify-center'>
            <Outlet />
        </div>
    </div>
  )
}

export default Admin
